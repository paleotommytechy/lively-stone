import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedPortalGuard } from './components/auth/ProtectedPortalGuard';
import { IOSHeader } from './components/ios/IOSHeader';
import { IOSTabBar } from './components/ios/IOSTabBar';
import { IOSDynamicIsland } from './components/ios/IOSDynamicIsland';
import { InteractiveQuizModal } from './components/views/student/InteractiveQuizModal';
import { AssignmentSubmitModal } from './components/views/student/AssignmentSubmitModal';
import { GlobalSearchModal } from './components/views/public/GlobalSearchModal';

import { QueryProvider } from './providers/QueryProvider';

// Public Views
import { HomeView } from './components/views/public/HomeView';
import { CachedAboutView } from './components/views/public/CachedAboutView';
import { SchoolOfTyrannusView } from './components/views/public/SchoolOfTyrannusView';
import { TeachingsPublicView } from './components/views/public/TeachingsPublicView';
import { KingdomImpactView } from './components/views/public/KingdomImpactView';
import { EventsView } from './components/views/public/EventsView';
import { JoinView } from './components/views/public/JoinView';

// Student Views
import { StudentDashboardView } from './components/views/student/StudentDashboardView';
import { DiscipleshipJourneyView } from './components/views/student/DiscipleshipJourneyView';
import { TeachingDetailView } from './components/views/student/TeachingDetailView';
import { AttendanceView } from './components/views/student/AttendanceView';
import { CommunityView } from './components/views/student/CommunityView';
import { QuestionsView } from './components/views/student/QuestionsView';
import { ShareCardGeneratorView } from './components/views/student/ShareCardGeneratorView';

// Admin Views
import { AdminOverviewView } from './components/views/admin/AdminOverviewView';
import { AdminTeachingsView } from './components/views/admin/AdminTeachingsView';
import { AdminQAView } from './components/views/admin/AdminQAView';
import { AdminStudentsView } from './components/views/admin/AdminStudentsView';
import { AdminShareCardsView } from './components/views/admin/AdminShareCardsView';
import { AdminSSGIView } from './components/views/admin/AdminSSGIView';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white relative tech-grid-bg transition-colors duration-500">
      {/* Multi-layered Ambient Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Right Cyan Glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[120px] animate-pulse-slow" />
        {/* Center Left Indigo Glow */}
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-[140px] animate-mesh-drift" />
        {/* Bottom Right Amber/Gold Glow */}
        <div className="absolute -bottom-40 right-1/4 w-[550px] h-[550px] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[130px] animate-pulse-slow" />
      </div>

      {/* Dynamic Toast Notification (iOS Dynamic Island) */}
      <div className="relative z-50">
        <IOSDynamicIsland />
      </div>

      {/* iOS Translucent Glass Header */}
      <IOSHeader />

      {/* Desktop / Mobile Floating Glass Tab Bar */}
      <IOSTabBar />

      {/* Main View Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 animate-ios-fade-in">
        <Outlet />
      </main>

      {/* Modals & Bottom Drawers */}
      <InteractiveQuizModal />
      <AssignmentSubmitModal />
      <GlobalSearchModal />
    </div>
  );
};

const StudentPortalLayout: React.FC = () => {
  return (
    <ProtectedPortalGuard requiredRole="student">
      <Outlet />
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
                <Route path="/about" element={<CachedAboutView />} />
                <Route path="/tyrannus" element={<SchoolOfTyrannusView />} />
                <Route path="/teachings" element={<TeachingsPublicView />} />
                <Route path="/teachings/:id" element={<TeachingDetailView />} />
                <Route path="/impact" element={<KingdomImpactView />} />
                <Route path="/events" element={<EventsView />} />
                <Route path="/join" element={<JoinView />} />

                {/* Student Portal Routes */}
                <Route element={<StudentPortalLayout />}>
                  <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="/student/dashboard" element={<StudentDashboardView />} />
                  <Route path="/student/journey" element={<DiscipleshipJourneyView />} />
                  <Route path="/student/teachings" element={<TeachingsPublicView />} />
                  <Route path="/student/teachings/:id" element={<TeachingDetailView />} />
                  <Route path="/student/attendance" element={<AttendanceView />} />
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
