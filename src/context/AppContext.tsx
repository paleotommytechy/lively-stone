import React, { createContext, useContext, useState, useEffect } from 'react';
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
  CommunityPost, 
  StudentQuestion, 
  ShareCard, 
  MinistryEvent, 
  SSGIImpactData,
  NotificationItem
} from '../types';

import { initialTeachings } from '../data/mock-teachings';
import { currentStudent } from '../data/mock-students';
import { initialQuizzes } from '../data/mock-quizzes';
import { initialAssignments } from '../data/mock-assignments';
import { initialAttendanceSessions } from '../data/mock-attendance';
import { initialCommunityPosts } from '../data/mock-community';
import { initialQuestions } from '../data/mock-questions';
import { initialEvents } from '../data/mock-events';
import { initialShareCards } from '../data/mock-share-cards';
import { ssgiImpactMock } from '../data/mock-outreach';

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
  theme: 'dark' | 'light';
  
  teachings: Teaching[];
  student: StudentProfile;
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

  showToast: (title: string, message: string) => void;
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roleView, setRoleViewState] = useState<RoleView>(() => getRoleFromPath(window.location.pathname));
  const [publicRoute, setPublicRoute] = useState<PublicRoute>('home');
  const [studentRoute, setStudentRoute] = useState<StudentRoute>('dashboard');
  const [adminRoute, setAdminRoute] = useState<AdminRoute>('overview');
  const [selectedTeachingId, setSelectedTeachingId] = useState<string | null>('t-101');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [teachings, setTeachings] = useState<Teaching[]>(initialTeachings);
  const [student, setStudent] = useState<StudentProfile>(currentStudent);
  const [quizzes] = useState<Quiz[]>(initialQuizzes);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(initialAttendanceSessions);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [questions, setQuestions] = useState<StudentQuestion[]>(initialQuestions);
  const [shareCards, setShareCards] = useState<ShareCard[]>(initialShareCards);
  const [events] = useState<MinistryEvent[]>(initialEvents);
  const [ssgiData] = useState<SSGIImpactData>(ssgiImpactMock);

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [activeShareCardModal, setActiveShareCardModal] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Handle browser popstate events (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setRoleViewState(getRoleFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (title: string, message: string) => {
    setToast({ id: Date.now().toString(), title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const hideToast = () => setToast(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setRoleView = (role: RoleView) => {
    setRoleViewState(role);
    const targetPath = getPathFromRole(role);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    showToast(`Switched Role View`, `Now viewing ${role.toUpperCase()} Experience (${targetPath})`);
  };

  const openTeachingDetail = (id: string) => {
    setSelectedTeachingId(id);
    if (roleView === 'public') {
      setPublicRoute('teaching-detail');
    } else if (roleView === 'student') {
      setStudentRoute('teaching-detail');
    }
  };

  const startQuiz = (quizId: string) => {
    const q = quizzes.find(item => item.id === quizId);
    if (q) {
      setActiveQuiz(q);
    } else {
      showToast('Quiz unavailable', 'No quiz attached to this teaching yet.');
    }
  };

  const closeQuiz = () => setActiveQuiz(null);

  const submitQuizResult = (quizId: string, score: number) => {
    showToast('Quiz Submitted!', `You scored ${score}%. Great consistency on your journey!`);
    setStudent(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      progressPercentage: Math.min(100, prev.progressPercentage + 4)
    }));
    setActiveQuiz(null);
  };

  const openAssignmentModal = (assignmentId: string) => {
    const a = assignments.find(item => item.id === assignmentId);
    if (a) {
      setActiveAssignment(a);
    }
  };

  const closeAssignmentModal = () => setActiveAssignment(null);

  const submitAssignment = (assignmentId: string, textResponse: string) => {
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
    showToast('Assignment Submitted', 'Your response was logged successfully for mentor review.');
    setActiveAssignment(null);
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

  const addCommunityPost = (content: string, category: CommunityPost['category'], scriptureRef?: string) => {
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
    showToast('Post Published', 'Your insight was shared with the discipleship community.');
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
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

  const addTeachingByAdmin = (newTeachingData: Omit<Teaching, 'id' | 'readCount' | 'isCompletedByStudent'>) => {
    const newTeaching: Teaching = {
      ...newTeachingData,
      id: `t-${Date.now()}`,
      readCount: 1,
      isCompletedByStudent: false
    };
    setTeachings(prev => [newTeaching, ...prev]);
    showToast('Teaching Published', `"${newTeaching.title}" is now live on School of Tyrannus!`);
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

  return (
    <AppContext.Provider
      value={{
        roleView,
        publicRoute,
        studentRoute,
        adminRoute,
        selectedTeachingId,
        theme,
        teachings,
        student,
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
