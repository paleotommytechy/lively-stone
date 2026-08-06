-- ============================================================================
-- LIVELY STONES — SCHOOL OF TYRANNUS LMS
-- SUPABASE BACKEND SETUP FOR ADMIN LEADERSHIP PORTAL (/admin)
-- Separate Standalone SQL Script for Admin Schema, RLS, & Management RPCs
-- ============================================================================

-- 1. Admin Profiles & Leadership Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    admin_title TEXT DEFAULT 'Apostolic Leader / Mentor',
    can_publish_teachings BOOLEAN DEFAULT true,
    can_manage_students BOOLEAN DEFAULT true,
    can_manage_ssgi BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin RLS Policy
CREATE POLICY "Admins can view and manage admin profiles"
    ON public.admin_profiles
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
        )
    );

-- 2. Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL, -- e.g. 'PUBLISH_TEACHING', 'ANSWER_QUESTION', 'UPDATE_SSGI'
    target_entity TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
    ON public.admin_audit_logs
    FOR SELECT
    USING (
        EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
    );

-- 3. Administrative Teachings Management Table
CREATE TABLE IF NOT EXISTS public.teachings (
    id TEXT PRIMARY KEY DEFAULT ('t-' || extract(epoch from now())::bigint::text),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    summary TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    speaker TEXT NOT NULL DEFAULT 'Saint Abraham Babatunde',
    topic TEXT NOT NULL,
    pillar TEXT NOT NULL,
    duration TEXT DEFAULT '45 mins',
    telegram_message_url TEXT,
    audio_url TEXT,
    video_url TEXT,
    scriptures JSONB DEFAULT '[]'::jsonb,
    key_points JSONB DEFAULT '[]'::jsonb,
    read_count INTEGER DEFAULT 1,
    published_by UUID REFERENCES public.admin_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.teachings ENABLE ROW LEVEL SECURITY;

-- Public & Students can view published teachings
CREATE POLICY "Everyone can view teachings"
    ON public.teachings
    FOR SELECT
    USING (true);

-- Only Admins can Insert / Update / Delete teachings
CREATE POLICY "Admins can manage teachings"
    ON public.teachings
    FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
    );

-- 4. SSGI Campaign Impact Admin Table
CREATE TABLE IF NOT EXISTS public.ssgi_impact_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_name TEXT NOT NULL,
    region TEXT NOT NULL,
    schools_visited INTEGER DEFAULT 0,
    students_reached INTEGER DEFAULT 0,
    bibles_distributed INTEGER DEFAULT 0,
    volunteers_mobilized INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ssgi_impact_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view SSGI metrics"
    ON public.ssgi_impact_metrics
    FOR SELECT
    USING (true);

CREATE POLICY "Admins can update SSGI metrics"
    ON public.ssgi_impact_metrics
    FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
    );

-- 5. Admin Security RPC Functions
CREATE OR REPLACE FUNCTION public.check_user_permission(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_is_admin BOOLEAN := false;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN false;
    END IF;

    IF required_role = 'public' THEN
        RETURN true;
    END IF;

    -- Check if user is in admin_profiles
    SELECT EXISTS (
        SELECT 1 FROM public.admin_profiles WHERE id = v_user_id
    ) INTO v_is_admin;

    IF required_role = 'admin' THEN
        RETURN v_is_admin;
    END IF;

    IF required_role = 'student' THEN
        -- Admin also has student portal permission
        IF v_is_admin THEN
            RETURN true;
        END IF;

        -- Check if student profile exists
        RETURN EXISTS (
            SELECT 1 FROM public.student_profiles WHERE id = v_user_id
        );
    END IF;

    RETURN false;
END;
$$;

-- Function for Admin to Publish New Teaching
CREATE OR REPLACE FUNCTION public.publish_teaching_by_admin(
    p_title TEXT,
    p_slug TEXT,
    p_description TEXT,
    p_summary TEXT,
    p_topic TEXT,
    p_pillar TEXT,
    p_telegram_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_admin_id UUID;
    v_teaching_id TEXT;
BEGIN
    v_admin_id := auth.uid();
    
    -- Verify admin permission
    IF NOT EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = v_admin_id) THEN
        RAISE EXCEPTION 'Unauthorized action: Admin privileges required';
    END IF;

    INSERT INTO public.teachings (
        title, slug, description, summary, topic, pillar, telegram_message_url, published_by
    ) VALUES (
        p_title, p_slug, p_description, p_summary, p_topic, p_pillar, p_telegram_url, v_admin_id
    ) RETURNING id INTO v_teaching_id;

    -- Log admin audit action
    INSERT INTO public.admin_audit_logs (admin_id, action_type, target_entity, details)
    VALUES (
        v_admin_id, 
        'PUBLISH_TEACHING', 
        v_teaching_id, 
        jsonb_build_object('title', p_title, 'topic', p_topic)
    );

    RETURN jsonb_build_object(
        'success', true,
        'teaching_id', v_teaching_id,
        'message', 'Teaching published successfully'
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_user_permission(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.publish_teaching_by_admin(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
