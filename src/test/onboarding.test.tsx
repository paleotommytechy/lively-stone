import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedPortalGuard } from '../components/auth/ProtectedPortalGuard';
import { AuthProvider, fetchUserProfile } from '../context/AuthContext';
import { AppProvider } from '../context/AppContext';
import { QueryProvider } from '../providers/QueryProvider';
import { OnboardingView } from '../components/views/student/OnboardingView';

// Mock Supabase client
vi.mock('../lib/supabase', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-1', email: 'disciple@livelystones.org' } } }),
        onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
        signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-1', email: 'disciple@livelystones.org' } }, error: null }),
        signUp: vi.fn().mockResolvedValue({ data: { user: { id: 'new-user-1', email: 'new@livelystones.org' } }, error: null }),
        signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
      from: vi.fn((table: string) => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn((field: string, val: string) => ({
          maybeSingle: vi.fn().mockImplementation(async () => {
            const raw = localStorage.getItem(`ls_profile_${val}`);
            if (raw) {
              return { data: JSON.parse(raw), error: null };
            }
            return {
              data: {
                id: val,
                email: 'disciple@livelystones.org',
                display_name: 'Test Disciple',
                onboarding_completed: false,
                profile_completion_pct: 20,
              },
              error: null,
            };
          }),
        })),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      })),
      rpc: vi.fn().mockResolvedValue({ data: true, error: null }),
    },
  };
});

describe('First-Time Student Profile Onboarding', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('1. Profile Model & Persistent Data Layer', () => {
    it('fetchUserProfile correctly maps onboarding_completed and profile_completion_pct', async () => {
      const profile = await fetchUserProfile('test-user-1', 'disciple@livelystones.org');
      expect(profile.onboarding_completed).toBe(false);
      expect(profile.profile_completion_pct).toBe(20);
    });

    it('persists completed status to localStorage cache as resilient offline fallback', async () => {
      localStorage.setItem('ls_profile_cached-1', JSON.stringify({
        id: 'cached-1',
        email: 'cached@livelystones.org',
        full_name: 'Cached Student',
        onboarding_completed: true,
        profile_completion_pct: 100,
      }));

      const profile = await fetchUserProfile('cached-1', 'cached@livelystones.org');
      expect(profile.onboarding_completed).toBe(true);
      expect(profile.profile_completion_pct).toBe(100);
    });
  });

  describe('2. Protected Route Gating & Redirection', () => {
    const TestApp = ({ initialEntry }: { initialEntry: string }) => {
      return (
        <MemoryRouter initialEntries={[initialEntry]}>
          <QueryProvider>
            <AuthProvider>
              <AppProvider>
                <Routes>
                  <Route
                    path="/student/*"
                    element={
                      <ProtectedPortalGuard requiredRole="student">
                        <Routes>
                          <Route path="onboarding" element={<div data-testid="onboarding-page">Onboarding Page</div>} />
                          <Route path="dashboard" element={<div data-testid="dashboard-page">Student Dashboard</div>} />
                          <Route path="bible" element={<div data-testid="bible-page">Bible Reader</div>} />
                        </Routes>
                      </ProtectedPortalGuard>
                    }
                  />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedPortalGuard requiredRole="admin">
                        <div data-testid="admin-dashboard">Admin Dashboard</div>
                      </ProtectedPortalGuard>
                    }
                  />
                </Routes>
              </AppProvider>
            </AuthProvider>
          </QueryProvider>
        </MemoryRouter>
      );
    };

    it('redirects incomplete/first-time student attempting to access /student/dashboard to /student/onboarding', async () => {
      // Incomplete profile in localStorage
      localStorage.setItem('ls_profile_test-user-1', JSON.stringify({
        id: 'test-user-1',
        email: 'disciple@livelystones.org',
        full_name: 'New Student',
        role: 'student',
        onboarding_completed: false,
      }));

      render(<TestApp initialEntry="/student/dashboard" />);

      // Should render the onboarding page, NOT the dashboard
      await waitFor(() => {
        expect(screen.getByTestId('onboarding-page')).toBeInTheDocument();
      });
      expect(screen.queryByTestId('dashboard-page')).not.toBeInTheDocument();
    });

    it('redirects incomplete student attempting to bypass via /student/bible to /student/onboarding', async () => {
      localStorage.setItem('ls_profile_test-user-1', JSON.stringify({
        id: 'test-user-1',
        email: 'disciple@livelystones.org',
        full_name: 'New Student',
        role: 'student',
        onboarding_completed: false,
      }));

      render(<TestApp initialEntry="/student/bible" />);

      await waitFor(() => {
        expect(screen.getByTestId('onboarding-page')).toBeInTheDocument();
      });
      expect(screen.queryByTestId('bible-page')).not.toBeInTheDocument();
    });

    it('allows completed student to access intended student portal destination without blocking', async () => {
      localStorage.setItem('ls_profile_test-user-1', JSON.stringify({
        id: 'test-user-1',
        email: 'disciple@livelystones.org',
        full_name: 'Completed Student',
        role: 'student',
        onboarding_completed: true,
      }));

      render(<TestApp initialEntry="/student/dashboard" />);

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
      });
    });

    it('redirects completed student away from /student/onboarding back to /student/dashboard', async () => {
      localStorage.setItem('ls_profile_test-user-1', JSON.stringify({
        id: 'test-user-1',
        email: 'disciple@livelystones.org',
        full_name: 'Completed Student',
        role: 'student',
        onboarding_completed: true,
      }));

      render(<TestApp initialEntry="/student/onboarding" />);

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
      });
      expect(screen.queryByTestId('onboarding-page')).not.toBeInTheDocument();
    });

    it('does not affect admin users on admin routes', async () => {
      render(<TestApp initialEntry="/admin/dashboard" />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('3. Onboarding Form Validation & Multi-Step Flow', () => {
    it('validates required fields before advancing to step 2', () => {
      render(
        <MemoryRouter>
          <QueryProvider>
            <AuthProvider>
              <AppProvider>
                <OnboardingView />
              </AppProvider>
            </AuthProvider>
          </QueryProvider>
        </MemoryRouter>
      );

      // Empty name
      const nameInput = screen.getByPlaceholderText(/Ifeoluwa Olusegun/i);
      fireEvent.change(nameInput, { target: { value: '' } });

      const nextButton = screen.getByText(/continue to spiritual goals/i);
      fireEvent.click(nextButton);

      // Error message should appear
      expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    });

    it('advances through steps when valid inputs are provided', () => {
      render(
        <MemoryRouter>
          <QueryProvider>
            <AuthProvider>
              <AppProvider>
                <OnboardingView />
              </AppProvider>
            </AuthProvider>
          </QueryProvider>
        </MemoryRouter>
      );

      const nameInput = screen.getByPlaceholderText(/Ifeoluwa Olusegun/i);
      fireEvent.change(nameInput, { target: { value: 'Ifeoluwa Olusegun' } });

      const phoneInput = screen.getByPlaceholderText(/\+234/i);
      fireEvent.change(phoneInput, { target: { value: '+2348012345678' } });

      const nextButton = screen.getByText(/continue to spiritual goals/i);
      fireEvent.click(nextButton);

      // Step 2 should be displayed
      expect(screen.getByText(/Step 2: Fellowship & Spiritual Growth Goals/i)).toBeInTheDocument();
    });
  });
});
