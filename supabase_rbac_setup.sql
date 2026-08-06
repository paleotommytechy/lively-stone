-- ============================================================================
-- LIVELY STONES INTERNATIONAL NETWORK & SCHOOL OF TYRANNUS
-- SUPABASE ROLE-BASED ACCESS CONTROL (RBAC) & DATABASE SETUP SCRIPT
-- ============================================================================

-- 1. Create custom enum type for User Roles if not exists
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('public', 'student', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create User Profiles Table extending Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  current_pillar TEXT,
  progress_percentage INT DEFAULT 0,
  weekly_streak INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure all columns exist if table was previously created
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_pillar TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS progress_percentage INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weekly_streak INT DEFAULT 0;

-- 3. Enable Row-Level Security (RLS) on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop policies before recreating to avoid duplicate policy errors
DROP POLICY IF EXISTS "Public profiles are viewable by owner and admin" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Public profiles are viewable by owner and admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. Create Protected Teachings Table
CREATE TABLE IF NOT EXISTS public.teachings (
  id TEXT PRIMARY KEY DEFAULT ('t-' || extract(epoch from now())::bigint::text),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  summary TEXT,
  topic TEXT,
  pillar TEXT NOT NULL,
  speaker TEXT,
  telegram_message_url TEXT,
  audio_url TEXT,
  video_url TEXT,
  is_restricted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guarantee columns exist if teachings table pre-existed without them
ALTER TABLE public.teachings ADD COLUMN IF NOT EXISTS is_restricted BOOLEAN DEFAULT FALSE;
ALTER TABLE public.teachings ADD COLUMN IF NOT EXISTS speaker TEXT;
ALTER TABLE public.teachings ADD COLUMN IF NOT EXISTS telegram_message_url TEXT;
ALTER TABLE public.teachings ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE public.teachings ADD COLUMN IF NOT EXISTS video_url TEXT;

ALTER TABLE public.teachings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Teachings select policy" ON public.teachings;
DROP POLICY IF EXISTS "Admins manage teachings" ON public.teachings;

CREATE POLICY "Teachings select policy"
  ON public.teachings FOR SELECT
  USING (
    is_restricted = FALSE 
    OR 
    (auth.role() = 'authenticated' AND (
      SELECT role FROM public.profiles WHERE id = auth.uid()
    ) IN ('student', 'admin'))
  );

CREATE POLICY "Admins manage teachings"
  ON public.teachings FOR ALL
  USING (
    auth.role() = 'authenticated' AND (
      SELECT role FROM public.profiles WHERE id = auth.uid()
    ) = 'admin'
  );

-- 5. Create Protected Student Assignments & Submissions Table

-- Safely drop old foreign key constraint and convert teaching_id ONLY if assignments table exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'assignments'
    ) THEN
        ALTER TABLE public.assignments DROP CONSTRAINT IF EXISTS assignments_teaching_id_fkey;
        ALTER TABLE public.assignments ALTER COLUMN teaching_id TYPE TEXT USING teaching_id::text;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  teaching_id TEXT,
  submission_text TEXT NOT NULL,
  status TEXT DEFAULT 'submitted',
  grade TEXT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS teaching_id TEXT;

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Student assignment access" ON public.assignments;

CREATE POLICY "Student assignment access"
  ON public.assignments FOR ALL
  USING (
    auth.uid() = student_id 
    OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 6. Trigger Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Server-Side Security RPC Function: check_user_permission
CREATE OR REPLACE FUNCTION public.check_user_permission(required_role TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  current_user_role public.user_role;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT role INTO current_user_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF current_user_role IS NULL THEN
    RETURN FALSE;
  END IF;

  IF required_role = 'admin' AND current_user_role = 'admin' THEN
    RETURN TRUE;
  ELSIF required_role = 'student' AND current_user_role IN ('student', 'admin') THEN
    RETURN TRUE;
  ELSIF required_role = 'public' THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.check_user_permission(TEXT) TO authenticated, anon;

-- 8. Admin Management RPC Function: Assign User Role by Email
CREATE OR REPLACE FUNCTION public.admin_assign_user_role(
  target_email TEXT,
  new_role public.user_role
)
RETURNS JSONB AS $$
DECLARE
  caller_role public.user_role;
  target_user_id UUID;
BEGIN
  SELECT role INTO caller_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF caller_role IS NULL OR caller_role != 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can assign user roles';
  END IF;

  UPDATE public.profiles
  SET role = new_role, updated_at = NOW()
  WHERE LOWER(email) = LOWER(target_email)
  RETURNING id INTO target_user_id;

  IF target_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'User with specified email address was not found'
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', target_user_id,
    'new_role', new_role,
    'message', 'Role updated successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.admin_assign_user_role(TEXT, public.user_role) TO authenticated;
