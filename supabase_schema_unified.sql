-- ============================================================================
-- LIVELY STONES PLATFORM — UNIFIED PRODUCTION DATABASE & AUTH SCHEMA
-- Discipleship Platform Operating System
-- Reference: DATABASE.md, PERMISSIONS.md, AUTHENTICATION.md
--
-- NOTE FOR MANUAL AUTH USER CREATIONS VIA SQL:
-- Supabase GoTrue Auth engine requires string token columns to be empty strings ''
-- (not SQL NULL): confirmation_token = '', recovery_token = '', email_change_token_new = '',
-- email_change = '', reauthentication_token = ''.
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

-- 7. EVENTS & REGISTRATIONS MODULE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL, -- 'Convention', 'Retreat', 'Evangelism', 'Class', 'Bible Study', 'Prayer Gathering'
    category TEXT NOT NULL DEFAULT 'Ministry',
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    date_formatted TEXT NOT NULL,
    time_formatted TEXT NOT NULL,
    location TEXT NOT NULL,
    venue_type TEXT NOT NULL DEFAULT 'in-person', -- 'in-person', 'online', 'hybrid'
    online_link TEXT,
    theme TEXT,
    description TEXT NOT NULL,
    speakers JSONB DEFAULT '[]'::jsonb,
    banner_url TEXT NOT NULL,
    registration_open BOOLEAN DEFAULT true,
    registered_count INTEGER DEFAULT 0,
    max_capacity INTEGER,
    checkin_pin TEXT DEFAULT '777',
    requires_checkin BOOLEAN DEFAULT true,
    published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    attendance_status TEXT NOT NULL DEFAULT 'registered', -- 'registered', 'attended', 'cancelled', 'no-show'
    qr_ticket_code TEXT NOT NULL DEFAULT ('TKT-' || upper(substr(md5(random()::text), 1, 8))),
    notes TEXT,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    checked_in_at TIMESTAMPTZ,
    UNIQUE(event_id, email)
);

-- 8. ATTENDANCE SESSIONS & RECORDS MODULE
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    session_time TEXT DEFAULT '5:00 PM',
    session_type TEXT NOT NULL DEFAULT 'Tyrannus', -- 'Tyrannus', 'Bible Study', 'Prayer Meeting', 'Special'
    pillar TEXT NOT NULL DEFAULT 'Grow',
    checkin_pin TEXT NOT NULL DEFAULT '777',
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'present', -- 'present', 'excused', 'absent', 'late'
    check_in_time TIMESTAMPTZ DEFAULT NOW(),
    excuse_reason TEXT,
    notes TEXT,
    marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, student_id)
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES FOR EVENTS & ATTENDANCE
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Events RLS
CREATE POLICY "Public can view published events"
    ON public.events FOR SELECT
    USING (deleted_at IS NULL);

CREATE POLICY "Admins and leaders can manage events"
    ON public.events FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head')
        )
    );

-- Event Registrations RLS
CREATE POLICY "Users and public can create registrations"
    ON public.event_registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view their own event registrations"
    ON public.event_registrations FOR SELECT
    USING (
        auth.uid() = user_id 
        OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head')
        )
    );

CREATE POLICY "Admins can update event registrations"
    ON public.event_registrations FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head')
        )
    );

-- Attendance Sessions RLS
CREATE POLICY "Authenticated disciples can view attendance sessions"
    ON public.attendance_sessions FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Mentors can manage attendance sessions"
    ON public.attendance_sessions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head', 'mentor')
        )
    );

-- Attendance Records RLS
CREATE POLICY "Students can view their own attendance records"
    ON public.attendance_records FOR SELECT
    USING (
        auth.uid() = student_id
        OR EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head', 'mentor')
        )
    );

CREATE POLICY "Students can insert their own check-in attendance"
    ON public.attendance_records FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Admins and Mentors can manage all attendance records"
    ON public.attendance_records FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
              AND ur.role IN ('administrator', 'super_admin', 'department_head', 'mentor')
        )
    );

-- 10. RPC FUNCTIONS FOR EVENTS & ATTENDANCE
-- Event Registration RPC
CREATE OR REPLACE FUNCTION public.register_for_event(
    p_event_id UUID,
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT DEFAULT NULL,
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_registration_id UUID;
    v_ticket_code TEXT;
    v_event RECORD;
BEGIN
    v_user_id := auth.uid();
    
    SELECT * INTO v_event FROM public.events WHERE id = p_event_id AND deleted_at IS NULL;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Event not found or no longer available';
    END IF;

    IF NOT v_event.registration_open THEN
        RAISE EXCEPTION 'Registration for this event is currently closed';
    END IF;

    IF v_event.max_capacity IS NOT NULL AND v_event.registered_count >= v_event.max_capacity THEN
        RAISE EXCEPTION 'Event has reached maximum registration capacity';
    END IF;

    v_ticket_code := 'TKT-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));

    INSERT INTO public.event_registrations (
        event_id, user_id, full_name, email, phone, qr_ticket_code, notes
    ) VALUES (
        p_event_id, v_user_id, p_full_name, p_email, p_phone, v_ticket_code, p_notes
    )
    ON CONFLICT (event_id, email) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        phone = COALESCE(EXCLUDED.phone, event_registrations.phone),
        notes = COALESCE(EXCLUDED.notes, event_registrations.notes)
    RETURNING id, qr_ticket_code INTO v_registration_id, v_ticket_code;

    -- Update registered count
    UPDATE public.events
    SET registered_count = (SELECT count(*) FROM public.event_registrations WHERE event_id = p_event_id)
    WHERE id = p_event_id;

    RETURN jsonb_build_object(
        'success', true,
        'registration_id', v_registration_id,
        'ticket_code', v_ticket_code,
        'event_title', v_event.title,
        'message', 'Registration confirmed successfully'
    );
END;
$$;

-- Student Session Check-In RPC
CREATE OR REPLACE FUNCTION public.checkin_student_attendance(
    p_session_id UUID,
    p_pin TEXT,
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_student_id UUID;
    v_session RECORD;
    v_record_id UUID;
    v_total_sessions INT;
    v_attended_count INT;
    v_new_rate INT;
BEGIN
    v_student_id := auth.uid();
    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Unauthenticated request';
    END IF;

    SELECT * INTO v_session FROM public.attendance_sessions WHERE id = p_session_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Session not found';
    END IF;

    IF NOT v_session.is_active THEN
        RAISE EXCEPTION 'Session check-in is closed';
    END IF;

    IF v_session.checkin_pin IS NOT NULL AND v_session.checkin_pin <> '' AND v_session.checkin_pin <> p_pin THEN
        RAISE EXCEPTION 'Invalid check-in PIN code';
    END IF;

    INSERT INTO public.attendance_records (
        session_id, student_id, status, notes, check_in_time
    ) VALUES (
        p_session_id, v_student_id, 'present', p_notes, NOW()
    )
    ON CONFLICT (session_id, student_id) DO UPDATE
    SET status = 'present',
        notes = COALESCE(EXCLUDED.notes, attendance_records.notes),
        check_in_time = NOW()
    RETURNING id INTO v_record_id;

    -- Recalculate student attendance metrics
    SELECT count(*) INTO v_total_sessions FROM public.attendance_sessions WHERE session_date <= CURRENT_DATE;
    SELECT count(*) INTO v_attended_count FROM public.attendance_records 
    WHERE student_id = v_student_id AND status IN ('present', 'excused');

    IF v_total_sessions > 0 THEN
        v_new_rate := LEAST(100, ROUND((v_attended_count::numeric / v_total_sessions::numeric) * 100));
    ELSE
        v_new_rate := 100;
    END IF;

    -- Update student profile
    UPDATE public.profiles
    SET profile_completion_pct = LEAST(100, profile_completion_pct + 2),
        updated_at = NOW()
    WHERE id = v_student_id;

    RETURN jsonb_build_object(
        'success', true,
        'record_id', v_record_id,
        'session_title', v_session.title,
        'attendance_rate', v_new_rate,
        'message', 'Attendance confirmed successfully'
    );
END;
$$;

-- Student Excuse Submission RPC
CREATE OR REPLACE FUNCTION public.request_session_excuse(
    p_session_id UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_student_id UUID;
    v_record_id UUID;
BEGIN
    v_student_id := auth.uid();
    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Unauthenticated request';
    END IF;

    IF p_reason IS NULL OR trim(p_reason) = '' THEN
        RAISE EXCEPTION 'Excuse reason is required';
    END IF;

    INSERT INTO public.attendance_records (
        session_id, student_id, status, excuse_reason
    ) VALUES (
        p_session_id, v_student_id, 'excused', p_reason
    )
    ON CONFLICT (session_id, student_id) DO UPDATE
    SET status = 'excused',
        excuse_reason = EXCLUDED.excuse_reason
    RETURNING id INTO v_record_id;

    RETURN jsonb_build_object(
        'success', true,
        'record_id', v_record_id,
        'message', 'Excuse submitted successfully'
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_for_event(UUID, TEXT, TEXT, TEXT, TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.checkin_student_attendance(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.request_session_excuse(UUID, TEXT) TO authenticated;
