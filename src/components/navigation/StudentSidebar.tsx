import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useUIStore } from '../../store/useUIStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  Flame, 
  Compass, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Calendar, 
  Users, 
  HelpCircle, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Sparkles, 
  X, 
  ExternalLink,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';
import { MinistryCrestSVG } from '../vectors/MinistryVectors';
import { Avatar } from '../ui/Avatar';
import { StudentRoute } from '../../types';

interface NavItem {
  id: string;
  route: StudentRoute;
  path: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: 'gold' | 'emerald' | 'amber' | 'blue';
}

interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export const StudentSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { student, setStudentRoute, studentRoute } = useApp();
  const { user, role, logout } = useAuth();
  
  const isSidebarCollapsed = useUIStore(state => state.isSidebarCollapsed);
  const toggleSidebarCollapsed = useUIStore(state => state.toggleSidebarCollapsed);
  const isMobileNavOpen = useUIStore(state => state.isMobileNavOpen);
  const setMobileNavOpen = useUIStore(state => state.setMobileNavOpen);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const drawerRef = useRef<HTMLDivElement>(null);

  // Grouped Navigation Definition with accurate existing application routes
  const navigationGroups: NavGroup[] = useMemo(() => [
    {
      id: 'core',
      title: 'Core & Discipleship',
      items: [
        {
          id: 'dashboard',
          route: 'dashboard',
          path: '/student/dashboard',
          label: 'Overview',
          shortLabel: 'Overview',
          icon: LayoutDashboard,
          badge: 'Live',
          badgeColor: 'emerald'
        },
        {
          id: 'journey',
          route: 'journey',
          path: '/student/journey',
          label: 'Growth Roadmap',
          shortLabel: 'Journey',
          icon: Award,
          badge: student.currentPillar,
          badgeColor: 'gold'
        },
        {
          id: 'onboarding',
          route: 'onboarding',
          path: '/student/onboarding',
          label: 'Foundation & Orientation',
          shortLabel: 'Foundation',
          icon: Compass
        }
      ]
    },
    {
      id: 'disciplines',
      title: 'Spiritual Disciplines',
      items: [
        {
          id: 'bible',
          route: 'bible',
          path: '/student/bible',
          label: 'Scripture & Exegesis',
          shortLabel: 'Bible',
          icon: BookOpen
        },
        {
          id: 'prayer',
          route: 'prayer',
          path: '/student/prayer',
          label: 'Upper Room Prayer',
          shortLabel: 'Prayer',
          icon: Flame,
          badge: 'Daily',
          badgeColor: 'amber'
        },
        {
          id: 'teachings',
          route: 'teachings',
          path: '/student/teachings',
          label: 'Tyrannus Teachings',
          shortLabel: 'Teachings',
          icon: GraduationCap
        }
      ]
    },
    {
      id: 'gatherings',
      title: 'Gatherings & Faithfulness',
      items: [
        {
          id: 'attendance',
          route: 'attendance',
          path: '/student/attendance',
          label: 'Attendance & Streak',
          shortLabel: 'Attendance',
          icon: ShieldCheck,
          badge: `${student.weeklyStreak} Wks`,
          badgeColor: 'gold'
        },
        {
          id: 'events',
          route: 'events',
          path: '/student/events',
          label: 'Convocations & Gatherings',
          shortLabel: 'Events',
          icon: Calendar
        }
      ]
    },
    {
      id: 'community_group',
      title: 'Apostolic Community',
      items: [
        {
          id: 'community',
          route: 'community',
          path: '/student/community',
          label: 'Community Feed',
          shortLabel: 'Community',
          icon: Users
        },
        {
          id: 'questions',
          route: 'questions',
          path: '/student/questions',
          label: 'Apostolic Q&A Desk',
          shortLabel: 'Q&A',
          icon: HelpCircle,
          badge: 'Ask Mentor',
          badgeColor: 'blue'
        },
        {
          id: 'share-cards',
          route: 'share-cards',
          path: '/student/share-cards',
          label: 'Share Insight Cards',
          shortLabel: 'Share',
          icon: Share2
        }
      ]
    }
  ], [student.currentPillar, student.weeklyStreak]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileNavOpen, setMobileNavOpen]);

  // Helper to determine if a route is active
  const isItemActive = (item: NavItem) => {
    return (
      location.pathname === item.path ||
      (item.route === 'teachings' && location.pathname.startsWith('/student/teachings')) ||
      studentRoute === item.route
    );
  };

  const handleNavigate = (item: NavItem) => {
    setStudentRoute(item.route);
    navigate(item.path);
    if (isMobileNavOpen) {
      setMobileNavOpen(false);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, itemId: string) => {
    if (!isSidebarCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 12
    });
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Find hovered item details for tooltip
  const activeTooltipItem = useMemo(() => {
    if (!hoveredItem) return null;
    for (const group of navigationGroups) {
      const found = group.items.find(i => i.id === hoveredItem);
      if (found) return { ...found, groupTitle: group.title };
    }
    return null;
  }, [hoveredItem, navigationGroups]);

  return (
    <>
      {/* DESKTOP & TABLET PERSISTENT SIDEBAR */}
      <aside
        role="navigation"
        aria-label="Student Portal Navigation"
        aria-expanded={!isSidebarCollapsed}
        className={`hidden md:flex flex-col shrink-0 sticky top-0 h-screen z-30 transition-all duration-300 ease-in-out border-r font-sans select-none
          bg-forest-950/95 dark:bg-forest-950/95 backdrop-blur-xl border-slate-200 dark:border-forest-800/80 text-slate-100 shadow-xl
          ${isSidebarCollapsed ? 'w-20' : 'w-68'}
        `}
      >
        {/* BRAND HEADER & LOGO */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-forest-800/80 shrink-0">
          <div 
            onClick={() => navigate('/student/dashboard')}
            className={`flex items-center gap-3 cursor-pointer group overflow-hidden ${
              isSidebarCollapsed ? 'justify-center w-full' : ''
            }`}
            title="School of Tyrannus Disciple Portal"
          >
            <div className="w-10 h-10 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform border border-forest-700/60">
              <MinistryCrestSVG className="w-5 h-5" />
            </div>

            {!isSidebarCollapsed && (
              <div className="min-w-0 transition-opacity duration-300">
                <h1 className="text-sm font-extrabold text-white tracking-tight leading-none truncate group-hover:text-gold-400 transition-colors">
                  Lively Stones
                </h1>
                <p className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider truncate mt-0.5">
                  School of Tyrannus
                </p>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebarCollapsed}
              className="p-1.5 rounded-xl text-slate-400 hover:text-gold-400 hover:bg-forest-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
              title="Collapse sidebar (Shift + S)"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* COLLAPSE TRIGGER WHEN COLLAPSED */}
        {isSidebarCollapsed && (
          <div className="px-3 py-2 border-b border-forest-800/80 flex justify-center">
            <button
              onClick={toggleSidebarCollapsed}
              className="p-2 rounded-xl text-slate-400 hover:text-gold-400 hover:bg-forest-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* NAVIGATION GROUPS CONTAINER */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              {!isSidebarCollapsed ? (
                <div className="px-3 pb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {group.title}
                  </span>
                </div>
              ) : (
                <div className="w-6 h-px bg-forest-800/60 mx-auto my-2" />
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item)}
                      onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                      onMouseLeave={handleMouseLeave}
                      aria-current={active ? 'page' : undefined}
                      aria-label={item.label}
                      className={`w-full flex items-center gap-3 rounded-2xl text-xs font-bold transition-all duration-200 relative group
                        focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none
                        ${isSidebarCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5'}
                        ${
                          active
                            ? 'bg-forest-800 text-gold-400 shadow-md border border-forest-700/80'
                            : 'text-slate-300 hover:text-white hover:bg-forest-900/60 hover:border-forest-800/60'
                        }
                      `}
                    >
                      {/* Active Left Indicator Bar for expanded */}
                      {active && !isSidebarCollapsed && (
                        <span className="absolute left-1.5 w-1 h-5 rounded-full bg-gold-400" />
                      )}

                      {/* Icon */}
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        active ? 'text-gold-400' : 'text-slate-400 group-hover:text-gold-400'
                      }`} />

                      {/* Label & Badges for Expanded State */}
                      {!isSidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0 text-left">
                          <span className="truncate tracking-tight font-semibold">
                            {item.label}
                          </span>
                          
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold shrink-0 border ${
                              item.badgeColor === 'emerald'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : item.badgeColor === 'amber'
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : item.badgeColor === 'blue'
                                ? 'bg-blue-500/20 text-cyan-400 border-blue-500/30'
                                : 'bg-gold-500/20 text-gold-400 border-gold-500/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* DISCIPLE PROFILE & CONTROLS FOOTER */}
        <div className="p-3 border-t border-forest-800/80 bg-forest-950/80 shrink-0">
          {!isSidebarCollapsed ? (
            <div className="space-y-3">
              {/* Disciple Profile Card */}
              <div className="p-3 rounded-2xl bg-forest-900/80 border border-forest-800 flex items-center gap-3">
                <Avatar
                  src={student.avatarUrl}
                  name={student.name}
                  size="md"
                  status="online"
                  className="ring-2 ring-gold-400/60"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">
                    {student.name}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-gold-400 font-semibold truncate">
                    <span>{student.currentPillar}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Flame className="w-3 h-3 text-gold-400" />
                      {student.weeklyStreak}w
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Controls: Public Portal & Logout */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {(role === 'admin' || user?.role === 'admin') ? (
                  <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="px-2.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-[11px] font-bold text-gold-400 border border-forest-700 transition-colors flex items-center justify-center gap-1 truncate focus-visible:ring-2 focus-visible:ring-gold-400"
                    title="Switch to Administrator Portal"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" />
                    Admin
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/')}
                    className="px-2.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-[11px] font-bold text-slate-300 hover:text-white border border-forest-700 transition-colors flex items-center justify-center gap-1 truncate focus-visible:ring-2 focus-visible:ring-gold-400"
                    title="Public Ministry Website"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    Public
                  </button>
                )}

                <button
                  onClick={logout}
                  className="px-2.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-[11px] font-bold text-red-400 border border-red-900/50 transition-colors flex items-center justify-center gap-1 truncate focus-visible:ring-2 focus-visible:ring-red-400"
                  title="Sign out of Disciple Session"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div 
                className="cursor-pointer group"
                onClick={() => navigate('/student/journey')}
                title={`${student.name} • ${student.currentPillar}`}
              >
                <Avatar
                  src={student.avatarUrl}
                  name={student.name}
                  size="sm"
                  status="online"
                  className="w-9 h-9 ring-2 ring-gold-400/60 group-hover:scale-105 transition-transform"
                />
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* FLOATING ACCESSIBLE TOOLTIP FOR COLLAPSED DESKTOP SIDEBAR */}
      {isSidebarCollapsed && activeTooltipItem && (
        <div
          role="tooltip"
          id={`tooltip-${activeTooltipItem.id}`}
          style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }}
          className="fixed -translate-y-1/2 z-50 pointer-events-none animate-ios-fade-in font-sans"
        >
          <div className="px-3.5 py-2 rounded-xl bg-forest-900 text-white border border-forest-700 shadow-2xl backdrop-blur-md flex flex-col gap-0.5 min-w-[150px]">
            <p className="text-[9px] font-mono uppercase tracking-wider text-gold-400 font-bold">
              {activeTooltipItem.groupTitle}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white">
                {activeTooltipItem.label}
              </span>
              {activeTooltipItem.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-gold-400/20 text-gold-400 border border-gold-400/30">
                  {activeTooltipItem.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SLIDE-IN NAVIGATION DRAWER */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden animate-ios-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Student Portal Navigation Menu"
        >
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-in Navigation Panel */}
          <div
            ref={drawerRef}
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-forest-950 border-r border-forest-800 text-white shadow-2xl flex flex-col z-50 animate-ios-scale-in"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-forest-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-md border border-forest-700">
                  <MinistryCrestSVG className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white tracking-tight">
                    Lively Stones
                  </h2>
                  <p className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider">
                    School of Tyrannus
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileNavOpen(false)}
                className="w-10 h-10 rounded-2xl bg-forest-900 text-slate-300 hover:text-white flex items-center justify-center border border-forest-800 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disciple Profile Quick Summary Card */}
            <div className="p-4 bg-forest-900/60 border-b border-forest-800/80">
              <div className="flex items-center gap-3">
                <Avatar
                  src={student.avatarUrl}
                  name={student.name}
                  size="md"
                  status="online"
                  className="w-11 h-11 ring-2 ring-gold-400/60 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">
                    {student.name}
                  </p>
                  <p className="text-[11px] font-mono text-gold-400 font-bold">
                    {student.currentPillar}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{student.attendanceRate}% Rate</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Flame className="w-3 h-3 text-gold-400" />
                      {student.weeklyStreak} Wks
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Navigation Groups */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
              {navigationGroups.map((group) => (
                <div key={group.id} className="space-y-1.5">
                  <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {group.title}
                  </p>

                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isItemActive(item);

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item)}
                          className={`w-full min-h-[44px] px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between gap-3 transition-all
                            ${
                              active
                                ? 'bg-forest-800 text-gold-400 border border-forest-700 shadow-md'
                                : 'text-slate-200 hover:bg-forest-900/60'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-gold-400' : 'text-slate-400'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                              item.badgeColor === 'emerald'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : item.badgeColor === 'amber'
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : item.badgeColor === 'blue'
                                ? 'bg-blue-500/20 text-cyan-400 border-blue-500/30'
                                : 'bg-gold-500/20 text-gold-400 border-gold-500/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Footer Actions */}
            <div className="p-4 border-t border-forest-800 bg-forest-950/90 space-y-2 safe-area-bottom">
              {(role === 'admin' || user?.role === 'admin') ? (
                <button
                  onClick={() => { setMobileNavOpen(false); navigate('/admin/dashboard'); }}
                  className="w-full min-h-[44px] px-4 py-2 rounded-2xl bg-forest-900 text-gold-400 font-bold text-xs border border-forest-700 flex items-center justify-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Switch to Admin Portal
                </button>
              ) : (
                <button
                  onClick={() => { setMobileNavOpen(false); navigate('/'); }}
                  className="w-full min-h-[44px] px-4 py-2 rounded-2xl bg-forest-900 text-slate-300 font-bold text-xs border border-forest-700 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Public Ministry Website
                </button>
              )}

              <button
                onClick={() => { setMobileNavOpen(false); logout(); }}
                className="w-full min-h-[44px] px-4 py-2 rounded-2xl bg-red-950/40 text-red-400 font-bold text-xs border border-red-900/50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
