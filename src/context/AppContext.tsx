import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/useUIStore';
import { 
  useTeachings, 
  useStudentProfiles, 
  useCommunityPosts, 
  useCreateCommunityPost, 
  useLikeCommunityPost,
  useSubmitQuiz,
  useSubmitAssignment,
  useAddTeaching,
  useEvents,
  useRegisterForEvent,
  useCreateEvent,
  useDeleteEvent,
  useAttendanceSessions as useAttendanceSessionsQuery,
  useCheckinAttendance,
  useSubmitExcuse,
  useAdminMarkAttendance
} from '../hooks/useDatabase';
import { 
  RoleView, 
  PublicRoute, 
  StudentRoute, 
  AdminRoute, 
  Teaching, 
  StudentProfile, 
  Quiz, 
  Assignment, 
  AttendanceSession, 
  SessionAttendanceStatus,
  CommunityPost, 
  StudentQuestion, 
  ShareCard, 
  MinistryEvent, 
  SSGIImpactData,
  NotificationItem
} from '../types';

import { initialEvents } from '../data/mock-events';
import { initialAttendanceSessions } from '../data/mock-attendance';
import { supabase } from '../lib/supabase';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  roleView: RoleView;
  publicRoute: PublicRoute;
  studentRoute: StudentRoute;
  adminRoute: AdminRoute;
  selectedTeachingId: string | null;
  selectedEventId: string | null;
  theme: 'dark' | 'light';
  
  teachings: Teaching[];
  student: StudentProfile;
  studentsList: StudentProfile[];
  quizzes: Quiz[];
  assignments: Assignment[];
  attendanceSessions: AttendanceSession[];
  communityPosts: CommunityPost[];
  questions: StudentQuestion[];
  shareCards: ShareCard[];
  events: MinistryEvent[];
  ssgiData: SSGIImpactData;

  // Active Modals & Workflows
  activeQuiz: Quiz | null;
  activeAssignment: Assignment | null;
  activeShareCardModal: boolean;
  toast: ToastMessage | null;

  // Actions
  setRoleView: (role: RoleView) => void;
  setPublicRoute: (route: PublicRoute) => void;
  setStudentRoute: (route: StudentRoute) => void;
  setAdminRoute: (route: AdminRoute) => void;
  openTeachingDetail: (id: string) => void;
  setSelectedEventId: (id: string | null) => void;
  toggleTheme: () => void;
  
  // Interactive Workflows
  startQuiz: (quizId: string) => void;
  closeQuiz: () => void;
  submitQuizResult: (quizId: string, score: number) => void;

  openAssignmentModal: (assignmentId: string) => void;
  closeAssignmentModal: () => void;
  submitAssignment: (assignmentId: string, textResponse: string) => void;

  toggleMarkTeachingCompleted: (teachingId: string) => void;
  addCommunityPost: (content: string, category: CommunityPost['category'], scriptureRef?: string) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;

  askQuestion: (questionText: string, category: string, teachingTitle?: string) => void;
  toggleLikeQuestion: (questionId: string) => void;
  answerQuestionByAdmin: (questionId: string, answerText: string) => void;

  addTeachingByAdmin: (newTeaching: Omit<Teaching, 'id' | 'readCount' | 'isCompletedByStudent'>) => void;
  createShareCard: (newCard: Omit<ShareCard, 'id' | 'downloadsCount' | 'approved'>) => void;
  incrementShareCardDownload: (id: string) => void;

  // Events & Attendance Actions
  registerForEvent: (eventId: string, fullName: string, email: string, phone?: string, notes?: string) => Promise<{ success: boolean; ticketCode?: string }>;
  createEventByAdmin: (newEvent: Omit<MinistryEvent, 'id' | 'registeredCount'>) => Promise<void>;
  deleteEventByAdmin: (eventId: string) => Promise<void>;
  checkinSession: (sessionId: string, pin: string, notes?: string) => Promise<boolean>;
  submitExcuse: (sessionId: string, reason: string) => Promise<boolean>;
  adminCreateAttendanceSession: (newSession: Omit<AttendanceSession, 'id' | 'attended'>) => void;
  adminMarkStudentAttendance: (sessionId: string, studentId: string, status: SessionAttendanceStatus, notes?: string) => void;
  generateIcsCalendarFile: (event: MinistryEvent) => void;
  generateGoogleCalendarUrl: (event: MinistryEvent) => string;

  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
}

const getRoleFromPath = (pathname: string): RoleView => {
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/learn')) return 'student';
  return 'public';
};

const getPathFromRole = (role: RoleView): string => {
  if (role === 'admin') return '/admin';
  if (role === 'student') return '/learn';
  return '/';
};

const defaultStudent: StudentProfile = {
  id: 'std-1',
  name: 'Ifeoluwa Disciple',
  email: 'disciple@livelystone.org',
  location: 'Lagos, Nigeria',
  avatarUrl: '/ifeoluwa.png',
  currentPillar: 'Grow',
  progressPercentage: 25,
  weeklyStreak: 4,
  totalTeachingsCompleted: 12,
  quizzesCompleted: 8,
  assignmentsSubmitted: 5,
  attendanceRate: 95,
  joinDate: 'Jan 2026',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roleView, setRoleViewState] = useState<RoleView>(() => getRoleFromPath(window.location.pathname));
  const [publicRoute, setPublicRouteState] = useState<PublicRoute>('home');
  const [studentRoute, setStudentRouteState] = useState<StudentRoute>('dashboard');
  const [adminRoute, setAdminRouteState] = useState<AdminRoute>('overview');
  const [selectedTeachingId, setSelectedTeachingId] = useState<string | null>(null);
  const theme = useUIStore(state => state.theme);
  const toast = useUIStore(state => state.toast);
  const activeQuiz = useUIStore(state => state.activeQuiz);
  const activeAssignment = useUIStore(state => state.activeAssignment);
  const activeShareCardModal = useUIStore(state => state.activeShareCardModal);

  const [teachings, setTeachings] = useState<Teaching[]>([]);
  const [student, setStudent] = useState<StudentProfile>(defaultStudent);
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([defaultStudent]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [questions, setQuestions] = useState<StudentQuestion[]>([]);
  const [shareCards, setShareCards] = useState<ShareCard[]>([]);
  const [events, setEvents] = useState<MinistryEvent[]>(initialEvents);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(initialAttendanceSessions);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [ssgiData, setSsgiData] = useState<SSGIImpactData>({
    campaignName: 'School Secondary Gospel Invasion (SSGI)',
    region: 'South-West Nigeria & West Africa',
    dateRange: '2025 - 2026 Academic Session',
    schoolsVisited: 18,
    studentsReached: 12800,
    biblesDistributed: 4250,
    volunteersMobilized: 340,
    stories: [
      {
        id: 'p-1',
        schoolName: 'King’s College, Lagos',
        location: 'Lagos State',
        snippet: 'Distributed 850 Bibles and saw over 300 students dedicate their lives to Christ.',
        fullStory: 'During the 3-day outreach at King’s College, the team conducted morning assembly devotions and small-group discipleship workshops.',
        imageUrl: '/david.jpg',
      },
    ],
  });

  // React Query queries
  const { data: teachingsData } = useTeachings();
  const { data: studentsListData } = useStudentProfiles();
  const { data: communityPostsData } = useCommunityPosts();
  const { data: eventsData } = useEvents();
  const { data: attendanceSessionsData } = useAttendanceSessionsQuery();

  const submitQuizMutation = useSubmitQuiz();
  const submitAssignmentMutation = useSubmitAssignment();
  const createPostMutation = useCreateCommunityPost();
  const likePostMutation = useLikeCommunityPost();
  const addTeachingMutation = useAddTeaching();
  const registerEventMutation = useRegisterForEvent();
  const createEventMutation = useCreateEvent();
  const deleteEventMutation = useDeleteEvent();
  const checkinAttendanceMutation = useCheckinAttendance();
  const submitExcuseMutation = useSubmitExcuse();
  const adminMarkAttendanceMutation = useAdminMarkAttendance();

  // Sync state with React Query data when it updates
  useEffect(() => {
    if (teachingsData && teachingsData.length > 0) {
      setTeachings(teachingsData);
      if (!selectedTeachingId) {
        setSelectedTeachingId(teachingsData[0].id);
      }
    }
  }, [teachingsData, selectedTeachingId]);

  useEffect(() => {
    if (eventsData && eventsData.length > 0) {
      setEvents(eventsData.map((e: any) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        type: e.type,
        category: e.category,
        date: e.date_formatted || e.date,
        time: e.time_formatted || e.time,
        startDate: e.start_date,
        endDate: e.end_date,
        location: e.location,
        venueType: e.venue_type || 'in-person',
        onlineLink: e.online_link,
        theme: e.theme,
        description: e.description,
        speakers: typeof e.speakers === 'string' ? JSON.parse(e.speakers) : (e.speakers || []),
        bannerUrl: e.banner_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        registrationOpen: e.registration_open ?? true,
        registeredCount: e.registered_count || 0,
        maxCapacity: e.max_capacity,
        checkinPin: e.checkin_pin,
        requiresCheckin: e.requires_checkin ?? true,
        userRegistered: false,
      })));
    }
  }, [eventsData]);

  useEffect(() => {
    if (attendanceSessionsData && attendanceSessionsData.length > 0) {
      setAttendanceSessions(attendanceSessionsData.map((s: any) => ({
        id: s.id,
        eventId: s.event_id,
        date: s.session_date,
        time: s.session_time || '5:00 PM',
        title: s.title,
        topic: s.topic,
        sessionType: s.session_type || 'Tyrannus',
        pillar: s.pillar || 'Grow',
        attended: false,
        status: 'absent',
        checkinPin: s.checkin_pin || '777',
        isActive: s.is_active ?? true,
      })));
    }
  }, [attendanceSessionsData]);

  useEffect(() => {
    if (studentsListData && studentsListData.length > 0) {
      setStudentsList(studentsListData);
      
      // Auto-select or sync the logged in user profile
      const getActiveUser = async () => {
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData.user?.id;
        if (userId) {
          const found = studentsListData.find(s => s.id === userId);
          if (found) setStudent(found);
        } else {
          setStudent(studentsListData[0]);
        }
      };
      getActiveUser();
    }
  }, [studentsListData]);

  useEffect(() => {
    if (communityPostsData && communityPostsData.length > 0) {
      setCommunityPosts(communityPostsData);
    }
  }, [communityPostsData]);

  const location = useLocation();
  const navigate = useNavigate();

  // Sync state with router location changes
  useEffect(() => {
    const pathname = location.pathname;
    
    // Sync roleView
    if (pathname.startsWith('/admin')) {
      setRoleViewState('admin');
      const parts = pathname.split('/');
      if (parts[2]) {
        setAdminRouteState(parts[2] as AdminRoute);
      }
    } else if (pathname.startsWith('/student')) {
      setRoleViewState('student');
      const parts = pathname.split('/');
      if (parts[2]) {
        if (parts[2] === 'teachings' && parts[3]) {
          setStudentRouteState('teaching-detail');
          setSelectedTeachingId(parts[3]);
        } else {
          setStudentRouteState(parts[2] as StudentRoute);
        }
      }
    } else {
      setRoleViewState('public');
      const routeName = pathname === '/' ? 'home' : pathname.substring(1);
      if (routeName.startsWith('teachings/')) {
        setPublicRouteState('teaching-detail');
        const id = routeName.split('/')[1];
        setSelectedTeachingId(id);
      } else {
        setPublicRouteState(routeName as PublicRoute);
      }
    }
  }, [location]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    useUIStore.getState().showToast(title, message, type);
  };

  const hideToast = () => useUIStore.getState().hideToast();

  const toggleTheme = () => useUIStore.getState().toggleTheme();

  const setRoleView = (role: RoleView) => {
    const targetPath = role === 'public' ? '/' : role === 'student' ? '/student/dashboard' : '/admin/dashboard';
    navigate(targetPath);
  };

  const setPublicRoute = (route: PublicRoute) => {
    if (route === 'teaching-detail') {
      navigate(`/teachings/${selectedTeachingId || 't-101'}`);
    } else {
      navigate(route === 'home' ? '/' : `/${route}`);
    }
  };

  const setStudentRoute = (route: StudentRoute) => {
    if (route === 'teaching-detail') {
      navigate(`/student/teachings/${selectedTeachingId || 't-101'}`);
    } else {
      navigate(`/student/${route}`);
    }
  };

  const setAdminRoute = (route: AdminRoute) => {
    navigate(`/admin/${route}`);
  };

  const openTeachingDetail = (id: string) => {
    setSelectedTeachingId(id);
    if (location.pathname.startsWith('/student') || roleView === 'student') {
      navigate(`/student/teachings/${id}`);
    } else {
      navigate(`/teachings/${id}`);
    }
  };

  const startQuiz = (quizId: string) => {
    const q = quizzes.find(item => item.id === quizId);
    if (q) {
      useUIStore.getState().setActiveQuiz(q);
    } else {
      showToast('Quiz unavailable', 'No quiz attached to this teaching yet.');
    }
  };

  const closeQuiz = () => useUIStore.getState().setActiveQuiz(null);

  const submitQuizResult = async (quizId: string, score: number) => {
    showToast('Submitting Quiz...', 'Sending result to server...');
    try {
      if (selectedTeachingId) {
        await submitQuizMutation.mutateAsync({
          quizId,
          teachingId: selectedTeachingId,
          score,
        });
      }
      showToast('Quiz Submitted!', `You scored ${score}%. Great consistency on your journey!`);
    } catch (err) {
      console.warn('Supabase quiz submit skipped:', err);
      // Local fallback
      setStudent(prev => ({
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        progressPercentage: Math.min(100, prev.progressPercentage + 4)
      }));
      showToast('Offline Mode', 'Quiz result saved locally on your device.');
    }
    useUIStore.getState().setActiveQuiz(null);
  };

  const openAssignmentModal = (assignmentId: string) => {
    const a = assignments.find(item => item.id === assignmentId);
    if (a) {
      useUIStore.getState().setActiveAssignment(a);
    }
  };

  const closeAssignmentModal = () => useUIStore.getState().setActiveAssignment(null);

  const submitAssignment = async (assignmentId: string, textResponse: string) => {
    if (!textResponse.trim()) {
      showToast('Validation Error', 'Submission text cannot be empty.');
      return;
    }
    showToast('Submitting...', 'Uploading your assignment response...');
    try {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      if (userId) {
        await submitAssignmentMutation.mutateAsync({
          student_id: userId,
          assignment_id: assignmentId,
          submission_text: textResponse,
        });
      }
      showToast('Assignment Submitted', 'Your answers are now pending evaluation by Apostolic Mentors.');
    } catch (err) {
      console.warn('Supabase assignment submit skipped:', err);
      // Local fallback
      setAssignments(prev =>
        prev.map(item =>
          item.id === assignmentId
            ? {
                ...item,
                submitted: true,
                submissionText: textResponse,
                submittedAt: 'Just now',
                status: 'submitted'
              }
            : item
        )
      );
      setStudent(prev => ({
        ...prev,
        assignmentsSubmitted: prev.assignmentsSubmitted + 1,
        progressPercentage: Math.min(100, prev.progressPercentage + 5)
      }));
      showToast('Submission Saved', 'Assignment recorded locally.');
    }
    useUIStore.getState().setActiveAssignment(null);
  };

  const toggleMarkTeachingCompleted = (teachingId: string) => {
    setTeachings(prev =>
      prev.map(item =>
        item.id === teachingId
          ? { ...item, isCompletedByStudent: !item.isCompletedByStudent }
          : item
      )
    );
    const target = teachings.find(t => t.id === teachingId);
    if (target) {
      const isNowDone = !target.isCompletedByStudent;
      if (isNowDone) {
        setStudent(prev => ({
          ...prev,
          totalTeachingsCompleted: prev.totalTeachingsCompleted + 1,
          progressPercentage: Math.min(100, prev.progressPercentage + 3)
        }));
        showToast('Teaching Completed', `Marked "${target.title}" as completed!`);
      }
    }
  };

  const addCommunityPost = async (content: string, category: CommunityPost['category'], scriptureRef?: string) => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      if (userId) {
        await createPostMutation.mutateAsync({
          author_id: userId,
          author_name: student.name,
          author_avatar: student.avatarUrl,
          category,
          content,
          scripture_ref: scriptureRef,
        });
      }
      showToast('Post Published', 'Your insight was shared with the discipleship community.');
    } catch (err) {
      console.warn('Supabase post creation skipped:', err);
      // Local fallback
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        authorName: student.name,
        authorAvatar: student.avatarUrl,
        authorRole: 'Student Disciple',
        category,
        content,
        scriptureRef,
        timestamp: 'Just now',
        likes: 1,
        isLiked: true,
        commentsCount: 0,
        comments: []
      };
      setCommunityPosts(prev => [newPost, ...prev]);
      showToast('Offline Mode', 'Post saved locally.');
    }
  };

  const toggleLikePost = async (postId: string) => {
    const post = communityPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Optimistic local update
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );

    try {
      await likePostMutation.mutateAsync({
        postId,
        currentLikes: post.likes,
      });
    } catch (err) {
      console.warn('Supabase like persist skipped:', err);
    }
  };

  const addCommentToPost = (postId: string, text: string) => {
    setCommunityPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComments = post.comments || [];
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [
              ...newComments,
              {
                id: `c-${Date.now()}`,
                authorName: student.name,
                authorAvatar: student.avatarUrl,
                content: text,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return post;
      })
    );
    showToast('Comment Added', 'Your comment was posted.');
  };

  const askQuestion = (questionText: string, category: string, teachingTitle?: string) => {
    const newQ: StudentQuestion = {
      id: `qna-${Date.now()}`,
      studentName: student.name,
      studentAvatar: student.avatarUrl,
      question: questionText,
      category,
      teachingTitle,
      timestamp: 'Just now',
      isAnswered: false,
      likes: 1,
      isLiked: true
    };
    setQuestions(prev => [newQ, ...prev]);
    showToast('Question Submitted', 'Your question has been sent to Saint Abraham Babatunde & Leadership team.');
  };

  const toggleLikeQuestion = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const isLiked = !q.isLiked;
          return {
            ...q,
            isLiked,
            likes: isLiked ? q.likes + 1 : q.likes - 1
          };
        }
        return q;
      })
    );
  };

  const answerQuestionByAdmin = (questionId: string, answerText: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            isAnswered: true,
            answer: {
              answeredBy: 'Saint Abraham Babatunde',
              answerText,
              timestamp: 'Just now'
            }
          };
        }
        return q;
      })
    );
    showToast('Question Answered', 'Answer published successfully for students.');
  };

  const addTeachingByAdmin = async (newTeachingData: Omit<Teaching, 'id' | 'readCount' | 'isCompletedByStudent'>) => {
    try {
      await addTeachingMutation.mutateAsync({
        title: newTeachingData.title,
        slug: newTeachingData.slug,
        description: newTeachingData.description,
        summary: newTeachingData.summary,
        topic: newTeachingData.topic,
        pillar: newTeachingData.pillar,
        telegram_url: newTeachingData.telegramMessageUrl,
      });
      showToast('Teaching Published', `"${newTeachingData.title}" is now live on School of Tyrannus!`);
    } catch (err) {
      console.warn('Supabase teaching publish skipped:', err);
      // Local fallback
      const newTeaching: Teaching = {
        ...newTeachingData,
        id: `t-${Date.now()}`,
        readCount: 1,
        isCompletedByStudent: false
      };
      setTeachings(prev => [newTeaching, ...prev]);
      showToast('Offline Mode', 'Teaching published locally.');
    }
  };

  const createShareCard = (newCardData: Omit<ShareCard, 'id' | 'downloadsCount' | 'approved'>) => {
    const newCard: ShareCard = {
      ...newCardData,
      id: `sc-${Date.now()}`,
      approved: true,
      downloadsCount: 1
    };
    setShareCards(prev => [newCard, ...prev]);
    showToast('Share Card Created', 'New social insight graphic generated!');
  };

  const incrementShareCardDownload = (id: string) => {
    setShareCards(prev =>
      prev.map(c => (c.id === id ? { ...c, downloadsCount: c.downloadsCount + 1 } : c))
    );
  };

  // ----------------------------------------------------
  // EVENTS & ATTENDANCE ACTIONS
  // ----------------------------------------------------
  const registerForEvent = async (
    eventId: string,
    fullName: string,
    email: string,
    phone?: string,
    notes?: string
  ): Promise<{ success: boolean; ticketCode?: string }> => {
    const generatedTicketCode = `TKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    // Optimistically update local state
    setEvents(prev =>
      prev.map(evt =>
        evt.id === eventId
          ? {
              ...evt,
              registeredCount: evt.registeredCount + 1,
              userRegistered: true,
              ticketCode: generatedTicketCode,
            }
          : evt
      )
    );

    try {
      await registerEventMutation.mutateAsync({
        eventId,
        fullName,
        email,
        phone,
        notes,
      });
    } catch (err) {
      console.warn('Supabase event registration error (using local state):', err);
    }

    showToast('Registration Confirmed', `You are registered! Ticket: ${generatedTicketCode}`, 'success');
    return { success: true, ticketCode: generatedTicketCode };
  };

  const createEventByAdmin = async (newEvent: Omit<MinistryEvent, 'id' | 'registeredCount'>) => {
    const id = `evt-${Date.now()}`;
    const fullEvent: MinistryEvent = {
      ...newEvent,
      id,
      registeredCount: 0,
      userRegistered: false,
    };

    setEvents(prev => [fullEvent, ...prev]);

    try {
      await createEventMutation.mutateAsync({
        title: newEvent.title,
        slug: newEvent.slug || newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type: newEvent.type,
        category: newEvent.category || 'Ministry',
        date_formatted: newEvent.date,
        time_formatted: newEvent.time,
        start_date: newEvent.startDate || new Date().toISOString(),
        location: newEvent.location,
        venue_type: newEvent.venueType || 'in-person',
        online_link: newEvent.onlineLink,
        theme: newEvent.theme,
        description: newEvent.description,
        speakers: newEvent.speakers,
        banner_url: newEvent.bannerUrl,
        registration_open: newEvent.registrationOpen,
        max_capacity: newEvent.maxCapacity,
        checkin_pin: newEvent.checkinPin || '777',
      });
    } catch (err) {
      console.warn('Supabase create event error:', err);
    }

    showToast('Event Created', `"${newEvent.title}" has been published.`, 'success');
  };

  const deleteEventByAdmin = async (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    try {
      await deleteEventMutation.mutateAsync(eventId);
    } catch (err) {
      console.warn('Supabase delete event skipped:', err);
    }
    showToast('Event Removed', 'Event has been archived.', 'info');
  };

  const checkinSession = async (sessionId: string, pin: string, notes?: string): Promise<boolean> => {
    const targetSession = attendanceSessions.find(s => s.id === sessionId);
    if (!targetSession) {
      showToast('Check-in Error', 'Session not found.', 'warning');
      return false;
    }

    if (targetSession.checkinPin && targetSession.checkinPin !== pin.trim()) {
      showToast('Invalid PIN', 'The session check-in code does not match.', 'warning');
      return false;
    }

    // Optimistic update
    setAttendanceSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? { ...s, attended: true, status: 'present', notes: notes || 'Confirmed present via self check-in.' }
          : s
      )
    );

    setStudent(prev => ({
      ...prev,
      weeklyStreak: prev.weeklyStreak + 1,
      attendanceRate: Math.min(100, Math.round(((attendanceSessions.filter(s => s.attended).length + 1) / attendanceSessions.length) * 100)),
      progressPercentage: Math.min(100, prev.progressPercentage + 2),
    }));

    try {
      await checkinAttendanceMutation.mutateAsync({
        sessionId,
        pin,
        notes,
      });
    } catch (err) {
      console.warn('Supabase checkin skipped (local state saved):', err);
    }

    showToast('Presence Confirmed!', `Attended "${targetSession.title}". Faithfulness recorded!`, 'success');
    return true;
  };

  const submitExcuse = async (sessionId: string, reason: string): Promise<boolean> => {
    if (!reason.trim()) {
      showToast('Validation Error', 'Please specify a reason for absence.', 'warning');
      return false;
    }

    setAttendanceSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? { ...s, attended: false, status: 'excused', notes: `Excuse note: ${reason}` }
          : s
      )
    );

    try {
      await submitExcuseMutation.mutateAsync({
        sessionId,
        reason,
      });
    } catch (err) {
      console.warn('Supabase excuse skipped:', err);
    }

    showToast('Excuse Submitted', 'Absence note recorded and sent to Apostolic Mentors.', 'info');
    return true;
  };

  const adminCreateAttendanceSession = (newSession: Omit<AttendanceSession, 'id' | 'attended'>) => {
    const session: AttendanceSession = {
      ...newSession,
      id: `att-${Date.now()}`,
      attended: false,
      status: 'absent',
      isActive: true,
    };
    setAttendanceSessions(prev => [session, ...prev]);
    showToast('Session Created', `New session "${newSession.title}" is now open for check-in.`, 'success');
  };

  const adminMarkStudentAttendance = (
    sessionId: string,
    studentId: string,
    status: SessionAttendanceStatus,
    notes?: string
  ) => {
    setAttendanceSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? { ...s, attended: status === 'present' || status === 'late', status, notes: notes || s.notes }
          : s
      )
    );

    try {
      adminMarkAttendanceMutation.mutate({
        sessionId,
        studentId,
        status,
        notes,
      });
    } catch (err) {
      console.warn('Supabase admin mark attendance error:', err);
    }

    showToast('Attendance Updated', `Student status marked as ${status.toUpperCase()}.`, 'info');
  };

  const generateIcsCalendarFile = (event: MinistryEvent) => {
    const cleanTitle = event.title.replace(/[,;]/g, '');
    const cleanDesc = event.description.replace(/\n/g, ' ');
    const cleanLocation = event.location.replace(/[,;]/g, '');
    
    // Format simple RFC 5545 timestamp
    const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lively Stones International Network//Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}@livelystone.org`,
      `DTSTAMP:${nowStr}`,
      `DTSTART:${nowStr}`,
      `SUMMARY:${cleanTitle}`,
      `DESCRIPTION:${cleanDesc}`,
      `LOCATION:${cleanLocation}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.slug || 'ministry-event'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar Invite Downloaded', `Added ${event.title} to your device calendar.`, 'success');
  };

  const generateGoogleCalendarUrl = (event: MinistryEvent): string => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nTheme: ${event.theme}\nSpeakers: ${event.speakers.join(', ')}`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <AppContext.Provider
      value={{
        roleView,
        publicRoute,
        studentRoute,
        adminRoute,
        selectedTeachingId,
        selectedEventId,
        theme,
        teachings,
        student,
        studentsList,
        quizzes,
        assignments,
        attendanceSessions,
        communityPosts,
        questions,
        shareCards,
        events,
        ssgiData,
        activeQuiz,
        activeAssignment,
        activeShareCardModal,
        toast,

        setRoleView,
        setPublicRoute,
        setStudentRoute,
        setAdminRoute,
        openTeachingDetail,
        setSelectedEventId,
        toggleTheme,

        startQuiz,
        closeQuiz,
        submitQuizResult,

        openAssignmentModal,
        closeAssignmentModal,
        submitAssignment,

        toggleMarkTeachingCompleted,
        addCommunityPost,
        toggleLikePost,
        addCommentToPost,

        askQuestion,
        toggleLikeQuestion,
        answerQuestionByAdmin,

        addTeachingByAdmin,
        createShareCard,
        incrementShareCardDownload,

        // Events & Attendance
        registerForEvent,
        createEventByAdmin,
        deleteEventByAdmin,
        checkinSession,
        submitExcuse,
        adminCreateAttendanceSession,
        adminMarkStudentAttendance,
        generateIcsCalendarFile,
        generateGoogleCalendarUrl,

        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
