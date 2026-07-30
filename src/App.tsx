import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { IOSHeader } from './components/ios/IOSHeader';
import { IOSTabBar } from './components/ios/IOSTabBar';
import { IOSDynamicIsland } from './components/ios/IOSDynamicIsland';
import { InteractiveQuizModal } from './components/views/student/InteractiveQuizModal';
import { AssignmentSubmitModal } from './components/views/student/AssignmentSubmitModal';

// Public Views
import { HomeView } from './components/views/public/HomeView';
import { AboutView } from './components/views/public/AboutView';
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
  const { roleView, publicRoute, studentRoute, adminRoute } = useApp();

  const renderContent = () => {
    // Public Experience Router
    if (roleView === 'public') {
      switch (publicRoute) {
        case 'home':
          return <HomeView />;
        case 'about':
          return <AboutView />;
        case 'tyrannus':
          return <SchoolOfTyrannusView />;
        case 'teachings':
          return <TeachingsPublicView />;
        case 'teaching-detail':
          return <TeachingDetailView />;
        case 'impact':
          return <KingdomImpactView />;
        case 'events':
          return <EventsView />;
        case 'join':
          return <JoinView />;
        default:
          return <HomeView />;
      }
    }

    // Student Experience Router
    if (roleView === 'student') {
      switch (studentRoute) {
        case 'dashboard':
          return <StudentDashboardView />;
        case 'journey':
          return <DiscipleshipJourneyView />;
        case 'teachings':
          return <TeachingsPublicView />;
        case 'teaching-detail':
          return <TeachingDetailView />;
        case 'attendance':
          return <AttendanceView />;
        case 'community':
          return <CommunityView />;
        case 'questions':
          return <QuestionsView />;
        case 'share-cards':
          return <ShareCardGeneratorView />;
        case 'events':
          return <EventsView />;
        default:
          return <StudentDashboardView />;
      }
    }

    // Admin Experience Router
    if (roleView === 'admin') {
      switch (adminRoute) {
        case 'overview':
          return <AdminOverviewView />;
        case 'students':
          return <AdminStudentsView />;
        case 'teachings':
        case 'create-teaching':
          return <AdminTeachingsView />;
        case 'questions':
          return <AdminQAView />;
        case 'share-cards':
          return <AdminShareCardsView />;
        case 'ssgi':
          return <AdminSSGIView />;
        default:
          return <AdminOverviewView />;
      }
    }

    return <HomeView />;
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white relative tech-grid-bg transition-colors duration-500">
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
        {renderContent()}
      </main>

      {/* Modals & Bottom Drawers */}
      <InteractiveQuizModal />
      <AssignmentSubmitModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
