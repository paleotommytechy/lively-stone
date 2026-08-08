export type RoleView = 'public' | 'student' | 'admin';

export type PublicRoute = 
  | 'home' 
  | 'about' 
  | 'tyrannus' 
  | 'teachings' 
  | 'teaching-detail' 
  | 'impact' 
  | 'events' 
  | 'join';

export type StudentRoute = 
  | 'dashboard' 
  | 'bible'
  | 'prayer'
  | 'onboarding'
  | 'journey' 
  | 'teachings' 
  | 'teaching-detail' 
  | 'quizzes' 
  | 'assignments' 
  | 'attendance' 
  | 'questions' 
  | 'community' 
  | 'share-cards' 
  | 'events' 
  | 'profile';

export type AdminRoute = 
  | 'overview' 
  | 'students' 
  | 'teachings' 
  | 'create-teaching' 
  | 'quizzes' 
  | 'assignments' 
  | 'attendance' 
  | 'questions' 
  | 'community' 
  | 'share-cards' 
  | 'events' 
  | 'ssgi' 
  | 'settings';

export type PillarStage = 'Learn' | 'Grow' | 'Live' | 'Serve' | 'Disciple' | 'Multiply';

export interface ScriptureReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  teachingId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimitMinutes?: number;
}

export interface Assignment {
  id: string;
  teachingId: string;
  title: string;
  instructions: string;
  deadline: string;
  pillar: PillarStage;
  submitted?: boolean;
  submissionText?: string;
  submittedAt?: string;
  status?: 'pending' | 'submitted' | 'graded';
  grade?: string;
  feedback?: string;
}

export interface Teaching {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  date: string;
  speaker: string;
  topic: string;
  pillar: PillarStage;
  duration: string;
  telegramMessageUrl: string;
  audioUrl?: string;
  videoUrl?: string;
  scriptures: ScriptureReference[];
  keyPoints: string[];
  quizId?: string;
  assignmentId?: string;
  isCompletedByStudent?: boolean;
  readCount: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  avatarUrl: string;
  currentPillar: PillarStage;
  progressPercentage: number;
  weeklyStreak: number;
  totalTeachingsCompleted: number;
  quizzesCompleted: number;
  assignmentsSubmitted: number;
  attendanceRate: number;
  joinDate: string;
  onboardingCompleted?: boolean;
  profileCompletionPct?: number;
}

export interface AttendanceSession {
  id: string;
  date: string;
  title: string;
  topic: string;
  attended: boolean;
  notes?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  category: 'Testimony' | 'Insight' | 'Prayer' | 'Question' | 'Encouragement';
  content: string;
  scriptureRef?: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }[];
}

export interface StudentQuestion {
  id: string;
  studentName: string;
  studentAvatar: string;
  question: string;
  teachingTitle?: string;
  category: string;
  timestamp: string;
  isAnswered: boolean;
  answer?: {
    answeredBy: string;
    answerText: string;
    timestamp: string;
  };
  likes: number;
  isLiked?: boolean;
  isFeatured?: boolean;
}

export type ShareCardTemplateId = 'editorial' | 'scripture' | 'insight';

export interface ShareCard {
  id: string;
  teachingId: string;
  teachingTitle: string;
  templateId: ShareCardTemplateId;
  headline: string;
  keyInsight: string;
  scriptureRef: string;
  speaker: string;
  bgGradient: string;
  approved: boolean;
  downloadsCount: number;
}

export type MinistryEventType = 
  | 'Convention' 
  | 'Retreat' 
  | 'Evangelism' 
  | 'Class' 
  | 'Bible Study' 
  | 'Prayer Gathering' 
  | 'Workshop';

export type VenueType = 'in-person' | 'online' | 'hybrid';

export interface MinistryEvent {
  id: string;
  title: string;
  slug?: string;
  type: MinistryEventType;
  category?: string;
  date: string;
  time: string;
  startDate?: string;
  endDate?: string;
  location: string;
  venueType?: VenueType;
  onlineLink?: string;
  theme: string;
  description: string;
  speakers: string[];
  bannerUrl: string;
  registrationOpen: boolean;
  registeredCount: number;
  maxCapacity?: number;
  checkinPin?: string;
  requiresCheckin?: boolean;
  userRegistered?: boolean;
  userAttended?: boolean;
  ticketCode?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  attendanceStatus: 'registered' | 'attended' | 'cancelled' | 'no-show';
  qrTicketCode: string;
  notes?: string;
  registeredAt: string;
  checkedInAt?: string;
}

export type SessionAttendanceStatus = 'present' | 'excused' | 'absent' | 'late';

export interface AttendanceSession {
  id: string;
  eventId?: string;
  date: string;
  time?: string;
  title: string;
  topic: string;
  sessionType?: 'Tyrannus' | 'Bible Study' | 'Prayer Meeting' | 'Special';
  pillar?: PillarStage;
  attended: boolean;
  status?: SessionAttendanceStatus;
  notes?: string;
  checkinPin?: string;
  isActive?: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  sessionTitle?: string;
  sessionDate?: string;
  studentId: string;
  studentName?: string;
  status: SessionAttendanceStatus;
  checkInTime?: string;
  excuseReason?: string;
  notes?: string;
  markedBy?: string;
}

export interface AttendanceSummary {
  attendanceRate: number;
  weeklyStreak: number;
  totalSessions: number;
  attendedCount: number;
  excusedCount: number;
  absentCount: number;
  monthlyConsistency: {
    month: string;
    rate: number;
    attended: number;
    total: number;
  }[];
}

export interface SSGIImpactData {
  campaignName: string;
  region: string;
  dateRange: string;
  schoolsVisited: number;
  studentsReached: number;
  biblesDistributed: number;
  volunteersMobilized: number;
  stories: {
    id: string;
    schoolName: string;
    location: string;
    snippet: string;
    fullStory: string;
    imageUrl: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'teaching' | 'quiz' | 'assignment' | 'event' | 'community' | 'qna';
  linkRoute?: string;
}

