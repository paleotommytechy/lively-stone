import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Teaching, StudentProfile, CommunityPost } from '../types';

// ----------------------------------------------------
// 1. TEACHINGS HOOKS
// ----------------------------------------------------
export const useTeachings = () => {
  return useQuery<Teaching[]>({
    queryKey: ['teachings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map((t: any) => ({
        id: t.id,
        title: t.title,
        slug: t.slug,
        description: t.description || '',
        summary: t.summary || '',
        date: t.date || new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        speaker: t.speaker || 'Saint Abraham Babatunde',
        topic: t.topic || 'Apostolic Doctrine',
        pillar: t.pillar || 'Learn',
        duration: t.duration || '45 mins',
        telegramMessageUrl: t.telegram_message_url || '',
        audioUrl: t.audio_url,
        videoUrl: t.video_url,
        scriptures: typeof t.scriptures === 'string' ? JSON.parse(t.scriptures) : (t.scriptures || []),
        keyPoints: typeof t.key_points === 'string' ? JSON.parse(t.key_points) : (t.key_points || []),
        readCount: t.read_count || 1,
        isCompletedByStudent: false,
      }));
    },
  });
};

// ----------------------------------------------------
// 2. STUDENT PROFILES HOOKS
// ----------------------------------------------------
export const useStudentProfiles = () => {
  return useQuery<StudentProfile[]>({
    queryKey: ['student_profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map((sp: any) => ({
        id: sp.id,
        name: sp.full_name || 'Disciple',
        email: sp.email,
        location: sp.location || 'Lagos, Nigeria',
        avatarUrl: sp.avatar_url || '/ifeoluwa.png',
        currentPillar: sp.current_pillar || 'Grow',
        progressPercentage: sp.progress_percentage || 0,
        weeklyStreak: sp.weekly_streak || 1,
        totalTeachingsCompleted: sp.total_teachings_completed || 0,
        quizzesCompleted: sp.quizzes_completed || 0,
        assignmentsSubmitted: sp.assignments_submitted || 0,
        attendanceRate: sp.attendance_rate || 90,
        joinDate: '2026',
      }));
    },
  });
};

// ----------------------------------------------------
// 3. COMMUNITY POSTS HOOKS
// ----------------------------------------------------
export const useCommunityPosts = () => {
  return useQuery<CommunityPost[]>({
    queryKey: ['community_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map((p: any) => ({
        id: p.id,
        authorName: p.author_name,
        authorAvatar: p.author_avatar || '/ifeoluwa.png',
        authorRole: 'Student Disciple',
        category: p.category,
        content: p.content,
        scriptureRef: p.scripture_ref,
        timestamp: new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: p.likes_count || 0,
        isLiked: false,
        commentsCount: 0,
        comments: [],
      }));
    },
  });
};

// ----------------------------------------------------
// 4. COMMUNITY POSTS MUTATIONS
// ----------------------------------------------------
export const useCreateCommunityPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPost: {
      author_id: string;
      author_name: string;
      author_avatar: string;
      category: string;
      content: string;
      scripture_ref?: string;
    }) => {
      const { data, error } = await supabase
        .from('student_community_posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community_posts'] });
    },
  });
};

export const useLikeCommunityPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, currentLikes }: { postId: string; currentLikes: number }) => {
      const { data, error } = await supabase
        .from('student_community_posts')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community_posts'] });
    },
  });
};

// ----------------------------------------------------
// 5. QUIZ & ASSIGNMENT MUTATIONS
// ----------------------------------------------------
export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quizId, teachingId, score }: { quizId: string; teachingId: string; score: number }) => {
      const { data, error } = await supabase.rpc('submit_student_quiz', {
        p_quiz_id: quizId,
        p_teaching_id: teachingId,
        p_score: score,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student_profiles'] });
    },
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSubmission: {
      student_id: string;
      assignment_id: string;
      submission_text: string;
    }) => {
      // Check if public.assignments exists (we can fallback to student_assignment_submissions or assignments)
      const { data, error } = await supabase
        .from('assignments')
        .insert([newSubmission])
        .select()
        .single();

      if (error) {
        // Fallback to student_assignment_submissions if assignments fails
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('student_assignment_submissions')
          .insert([newSubmission])
          .select()
          .single();

        if (fallbackError) throw fallbackError;
        return fallbackData;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student_profiles'] });
    },
  });
};

// ----------------------------------------------------
// 6. ADMIN TEACHINGS MUTATIONS
// ----------------------------------------------------
export const useAddTeaching = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTeaching: {
      title: string;
      slug: string;
      description: string;
      summary: string;
      topic: string;
      pillar: string;
      telegram_url?: string;
    }) => {
      const { data, error } = await supabase.rpc('publish_teaching_by_admin', {
        p_title: newTeaching.title,
        p_slug: newTeaching.slug,
        p_description: newTeaching.description,
        p_summary: newTeaching.summary,
        p_topic: newTeaching.topic,
        p_pillar: newTeaching.pillar,
        p_telegram_url: newTeaching.telegram_url || '',
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachings'] });
    },
  });
};

// ----------------------------------------------------
// 7. EVENTS HOOKS & MUTATIONS
// ----------------------------------------------------
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .is('deleted_at', null)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};

export const useRegisterForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      fullName,
      email,
      phone,
      notes,
    }: {
      eventId: string;
      fullName: string;
      email: string;
      phone?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.rpc('register_for_event', {
        p_event_id: eventId,
        p_full_name: fullName,
        p_email: email,
        p_phone: phone || null,
        p_notes: notes || null,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventData: any) => {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      const { data, error } = await supabase
        .from('events')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// ----------------------------------------------------
// 8. ATTENDANCE SESSIONS & RECORDS HOOKS
// ----------------------------------------------------
export const useAttendanceSessions = () => {
  return useQuery({
    queryKey: ['attendance_sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_sessions')
        .select('*')
        .order('session_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCheckinAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      pin,
      notes,
    }: {
      sessionId: string;
      pin: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.rpc('checkin_student_attendance', {
        p_session_id: sessionId,
        p_pin: pin,
        p_notes: notes || null,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance_sessions'] });
      queryClient.invalidateQueries({ queryKey: ['student_profiles'] });
    },
  });
};

export const useSubmitExcuse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      reason,
    }: {
      sessionId: string;
      reason: string;
    }) => {
      const { data, error } = await supabase.rpc('request_session_excuse', {
        p_session_id: sessionId,
        p_reason: reason,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance_sessions'] });
    },
  });
};

export const useAdminMarkAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      studentId,
      status,
      notes,
    }: {
      sessionId: string;
      studentId: string;
      status: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('attendance_records')
        .upsert({
          session_id: sessionId,
          student_id: studentId,
          status,
          notes,
          check_in_time: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance_sessions'] });
      queryClient.invalidateQueries({ queryKey: ['student_profiles'] });
    },
  });
};

