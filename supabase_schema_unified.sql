-- ============================================================================
-- LIVELY STONES PLATFORM — UNIFIED PRODUCTION DATABASE & AUTH SCHEMA
-- Discipleship Platform Operating System
-- Reference: DATABASE.md, PERMISSIONS.md, AUTHENTICATION.md
-- ============================================================================

-- 1. ENUMS & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM (
        'disciple',
        'mentor',
        'department_member',
        'department_head',
        'administrator',
        'super_admin'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.account_status AS ENUM (
        'pending_verification',
        'active',
        'suspended',
        'disabled',
        'archived'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.prayer_privacy AS ENUM (
        'private',
        'mentor_only',
        'prayer_team',
        'small_group',
        'community'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. USERS & PROFILES (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    biography TEXT,
    phone TEXT,
    gender TEXT,
    date_of_birth DATE,
    country TEXT DEFAULT 'Nigeria',
    state TEXT,
    city TEXT,
    occupation TEXT,
    fellowship TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    profile_completion_pct INT DEFAULT 20,
    status public.account_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles select policy" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR auth.role() = 'authenticated');

CREATE POLICY "Profiles update policy" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 3. ROLES & USER_ROLES (M:N)
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name public.app_role UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role public.app_role NOT NULL,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name, onboarding_completed, profile_completion_pct)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        false,
        20
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'disciple')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. RPC PERMISSION VERIFICATION FUNCTION
CREATE OR REPLACE FUNCTION public.check_user_permission(required_role TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_has_role BOOLEAN := false;
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN false;
    END IF;

    IF required_role = 'public' OR required_role = 'visitor' THEN
        RETURN true;
    END IF;

    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
          AND (
            role::text = required_role
            OR (required_role = 'student' AND role IN ('disciple', 'administrator', 'super_admin'))
            OR (required_role = 'admin' AND role IN ('administrator', 'super_admin'))
          )
    ) INTO user_has_role;

    RETURN user_has_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. BIBLE & PRAYER TABLES
CREATE TABLE IF NOT EXISTS public.bible_reading_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'Personal',
    privacy public.prayer_privacy DEFAULT 'community',
    is_answered BOOLEAN DEFAULT false,
    answered_testimony TEXT,
    answered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bible_reading_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reading plans" ON public.bible_reading_plans FOR SELECT USING (true);
CREATE POLICY "Prayer request access control" ON public.prayer_requests FOR ALL USING (
    auth.uid() = user_id OR privacy = 'community'
);
