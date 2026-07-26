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
    <div className="min-h-screen bg-[#F0F4F8] dark:bg-black text-[#0F172A] dark:text-zinc-100 flex flex-col selection:bg-[#3B82F6] selection:text-white">
      {/* Dynamic Toast Notification (iOS Dynamic Island) */}
      <IOSDynamicIsland />

      {/* iOS Translucent Header */}
      <IOSHeader />

      {/* Desktop / Mobile Tab Bar */}
      <IOSTabBar />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
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
