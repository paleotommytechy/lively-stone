-- ============================================================================
-- LIVELY STONES — SCHOOL OF TYRANNUS LMS
-- SUPABASE BACKEND SETUP FOR STUDENT PORTAL (/learn)
-- Separate Standalone SQL Script for Student Schema, RLS, & Functions
-- ============================================================================

-- 1. Create Pillar Stage Enum & Student Profiles Table
CREATE TYPE public.pillar_stage AS ENUM ('Learn', 'Grow', 'Live', 'Serve', 'Disciple', 'Multiply');

CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT '/ifeoluwa.png',
    location TEXT DEFAULT 'Lagos, Nigeria',
    current_pillar public.pillar_stage DEFAULT 'Grow',
    progress_percentage INTEGER DEFAULT 25,
    weekly_streak INTEGER DEFAULT 4,
    total_teachings_completed INTEGER DEFAULT 12,
    quizzes_completed INTEGER DEFAULT 8,
    assignments_submitted INTEGER DEFAULT 5,
    attendance_rate INTEGER DEFAULT 95,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on Student Profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- 2. Student RLS Policies
-- Students can read their own profile
CREATE POLICY "Students can view their own profile"
    ON public.student_profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Students can update their own profile details
CREATE POLICY "Students can update their own profile"
    ON public.student_profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- 3. Student Submissions Tables (Quiz & Assignment)
CREATE TABLE IF NOT EXISTS public.student_quiz_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    quiz_id TEXT NOT NULL,
    teaching_id TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    passed BOOLEAN NOT NULL DEFAULT true,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can insert their own quiz submissions"
    ON public.student_quiz_submissions
    FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view their own quiz submissions"
    ON public.student_quiz_submissions
    FOR SELECT
    USING (auth.uid() = student_id);

CREATE TABLE IF NOT EXISTS public.student_assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    assignment_id TEXT NOT NULL,
    submission_text TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('pending', 'submitted', 'graded')),
    grade TEXT,
    feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_assignment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can insert assignment submissions"
    ON public.student_assignment_submissions
    FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view assignment submissions"
    ON public.student_assignment_submissions
    FOR SELECT
    USING (auth.uid() = student_id);

-- 4. Community & Q&A Interaction Tables for Students
CREATE TABLE IF NOT EXISTS public.student_community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_avatar TEXT DEFAULT '/ifeoluwa.png',
    category TEXT NOT NULL CHECK (category IN ('Testimony', 'Insight', 'Prayer', 'Question', 'Encouragement')),
    content TEXT NOT NULL,
    scripture_ref TEXT,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view community posts"
    ON public.student_community_posts
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Students can create community posts"
    ON public.student_community_posts
    FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- 5. Student Specific RPC Functions
CREATE OR REPLACE FUNCTION public.submit_student_quiz(
    p_quiz_id TEXT,
    p_teaching_id TEXT,
    p_score INTEGER
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_student_id UUID;
    v_passed BOOLEAN;
    v_submission_id UUID;
BEGIN
    v_student_id := auth.uid();
    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Unauthenticated request';
    END IF;

    v_passed := p_score >= 70;

    INSERT INTO public.student_quiz_submissions (student_id, quiz_id, teaching_id, score, passed)
    VALUES (v_student_id, p_quiz_id, p_teaching_id, p_score, v_passed)
    RETURNING id INTO v_submission_id;

    -- Automatically bump student progress percentage & completed count
    UPDATE public.student_profiles
    SET 
        quizzes_completed = quizzes_completed + 1,
        progress_percentage = LEAST(100, progress_percentage + 4),
        updated_at = NOW()
    WHERE id = v_student_id;

    RETURN jsonb_build_object(
        'success', true,
        'submission_id', v_submission_id,
        'score', p_score,
        'passed', v_passed,
        'message', 'Quiz submission recorded successfully'
    );
END;
$$;

-- Grant execution to authenticated student users
GRANT EXECUTE ON FUNCTION public.submit_student_quiz TO authenticated;
