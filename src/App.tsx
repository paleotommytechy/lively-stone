import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedPortalGuard } from './components/auth/ProtectedPortalGuard';
import { Header } from './components/navigation/Header';
import { Navigation } from './components/navigation/Navigation';
import { InteractiveQuizModal } from './components/views/student/InteractiveQuizModal';
import { AssignmentSubmitModal } from './components/views/student/AssignmentSubmitModal';
import { GlobalSearchModal } from './components/views/public/GlobalSearchModal';

import { QueryProvider } from './providers/QueryProvider';

// Public Views
import { HomeView } from './components/views/public/HomeView';
import { AboutView } from './components/views/public/AboutView';
import { SchoolOfTyrannusView } from './components/views/public/SchoolOfTyrannusView';
import { TeachingsPublicView } from './components/views/public/TeachingsPublicView';
import { KingdomImpactView } from './components/views/public/KingdomImpactView';
import { EventsView } from './components/views/public/EventsView';
import { JoinView } from './components/views/public/JoinView';

// Student / Disciple Views
import { StudentDashboardView } from './components/views/student/StudentDashboardView';
import { DiscipleshipJourneyView } from './components/views/student/DiscipleshipJourneyView';
import { TeachingDetailView } from './components/views/student/TeachingDetailView';
import { AttendanceView } from './components/views/student/AttendanceView';
import { CommunityView } from './components/views/student/CommunityView';
import { QuestionsView } from './components/views/student/QuestionsView';
import { ShareCardGeneratorView } from './components/views/student/ShareCardGeneratorView';
import { BibleReaderView } from './components/views/student/BibleReaderView';
import { PrayerSystemView } from './components/views/student/PrayerSystemView';
import { OnboardingView } from './components/views/student/OnboardingView';

// Admin Views
import { AdminOverviewView } from './components/views/admin/AdminOverviewView';
import { AdminTeachingsView } from './components/views/admin/AdminTeachingsView';
import { AdminQAView } from './components/views/admin/AdminQAView';
import { AdminStudentsView } from './components/views/admin/AdminStudentsView';
import { AdminShareCardsView } from './components/views/admin/AdminShareCardsView';
import { AdminSSGIView } from './components/views/admin/AdminSSGIView';
import { AdminEventsView } from './components/views/admin/AdminEventsView';
import { AdminAttendanceView } from './components/views/admin/AdminAttendanceView';

import { StudentSidebar } from './components/navigation/StudentSidebar';
import { StudentHeader } from './components/navigation/StudentHeader';
import { useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isStudentPortal = location.pathname.startsWith('/student');

  if (isStudentPortal) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-forest-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 font-sans">
        <Outlet />
        {/* Modals */}
        <InteractiveQuizModal />
        <AssignmentSubmitModal />
        <GlobalSearchModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-forest-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 font-sans">
      <Header />
      <Navigation />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Modals */}
      <InteractiveQuizModal />
      <AssignmentSubmitModal />
      <GlobalSearchModal />
    </div>
  );
};

const StudentPortalLayout: React.FC = () => {
  return (
    <ProtectedPortalGuard requiredRole="student">
      <div className="min-h-screen flex bg-slate-50 dark:bg-forest-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        <StudentSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <StudentHeader />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedPortalGuard>
  );
};

const AdminPortalLayout: React.FC = () => {
  return (
    <ProtectedPortalGuard requiredRole="admin">
      <Outlet />
    </ProtectedPortalGuard>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<HomeView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/tyrannus" element={<SchoolOfTyrannusView />} />
                <Route path="/teachings" element={<TeachingsPublicView />} />
                <Route path="/teachings/:id" element={<TeachingDetailView />} />
                <Route path="/impact" element={<KingdomImpactView />} />
                <Route path="/events" element={<EventsView />} />
                <Route path="/join" element={<JoinView />} />

                {/* Student / Disciple Portal Routes */}
                <Route element={<StudentPortalLayout />}>
                  <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="/student/dashboard" element={<StudentDashboardView />} />
                  <Route path="/student/bible" element={<BibleReaderView />} />
                  <Route path="/student/prayer" element={<PrayerSystemView />} />
                  <Route path="/student/onboarding" element={<OnboardingView />} />
                  <Route path="/student/journey" element={<DiscipleshipJourneyView />} />
                  <Route path="/student/teachings" element={<TeachingsPublicView />} />
                  <Route path="/student/teachings/:id" element={<TeachingDetailView />} />
                  <Route path="/student/attendance" element={<AttendanceView />} />
                  <Route path="/student/events" element={<EventsView />} />
                  <Route path="/student/community" element={<CommunityView />} />
                  <Route path="/student/questions" element={<QuestionsView />} />
                  <Route path="/student/share-cards" element={<ShareCardGeneratorView />} />
                </Route>

                {/* Admin Portal Routes */}
                <Route element={<AdminPortalLayout />}>
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminOverviewView />} />
                  <Route path="/admin/students" element={<AdminStudentsView />} />
                  <Route path="/admin/teachings" element={<AdminTeachingsView />} />
                  <Route path="/admin/events" element={<AdminEventsView />} />
                  <Route path="/admin/attendance" element={<AdminAttendanceView />} />
                  <Route path="/admin/questions" element={<AdminQAView />} />
                  <Route path="/admin/share-cards" element={<AdminShareCardsView />} />
                  <Route path="/admin/ssgi" element={<AdminSSGIView />} />
                </Route>

                {/* Fallback Catch All */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </AppProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

