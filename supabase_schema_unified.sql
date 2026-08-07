-- ============================================================================
-- LIVELY STONES PLATFORM — UNIFIED PRODUCTION DATABASE SCHEMA
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

-- 4. BIBLE SYSTEM TABLES
CREATE TABLE IF NOT EXISTS public.bible_reading_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_bible_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.bible_reading_plans(id) ON DELETE CASCADE,
    book TEXT NOT NULL,
    chapter INT NOT NULL,
    verse INT,
    completed BOOLEAN DEFAULT true,
    streak_days INT DEFAULT 1,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_bible_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    book TEXT NOT NULL,
    chapter INT NOT NULL,
    verse TEXT NOT NULL,
    color TEXT DEFAULT 'gold',
    category TEXT DEFAULT 'Personal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_bible_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    book TEXT NOT NULL,
    chapter INT NOT NULL,
    verse TEXT NOT NULL,
    note_content TEXT NOT NULL,
    tags TEXT[],
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_bible_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    book TEXT NOT NULL,
    chapter INT NOT NULL,
    verse TEXT NOT NULL,
    collection_name TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bible_reading_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bible_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bible_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bible_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bible_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reading plans" ON public.bible_reading_plans FOR SELECT USING (true);
CREATE POLICY "Users access own progress" ON public.user_bible_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own highlights" ON public.user_bible_highlights FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own notes" ON public.user_bible_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own bookmarks" ON public.user_bible_bookmarks FOR ALL USING (auth.uid() = user_id);

-- 5. PRAYER SYSTEM TABLES
CREATE TABLE IF NOT EXISTS public.prayer_journal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    scripture_ref TEXT,
    tags TEXT[],
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

ALTER TABLE public.prayer_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own prayer journal" ON public.prayer_journal FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Prayer request access control" ON public.prayer_requests FOR ALL USING (
    auth.uid() = user_id OR privacy = 'community'
);

-- 6. COMMUNITY & TEACHINGS
CREATE TABLE IF NOT EXISTS public.teachings (
    id TEXT PRIMARY KEY DEFAULT ('t-' || extract(epoch from now())::bigint::text),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    summary TEXT NOT NULL,
    speaker TEXT DEFAULT 'Saint Abraham Babatunde',
    topic TEXT NOT NULL,
    pillar TEXT NOT NULL,
    duration TEXT DEFAULT '45 mins',
    telegram_message_url TEXT,
    audio_url TEXT,
    video_url TEXT,
    scriptures JSONB DEFAULT '[]'::jsonb,
    key_points JSONB DEFAULT '[]'::jsonb,
    read_count INT DEFAULT 1,
    published_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    scripture_ref TEXT,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.teachings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone view teachings" ON public.teachings FOR SELECT USING (true);
CREATE POLICY "Authenticated view posts" ON public.community_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authors create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

-- 7. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
