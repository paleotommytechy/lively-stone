import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, UserRole, UserProfile } from '../lib/supabase';

export interface OnboardingData {
  fullName: string;
  phone: string;
  country: string;
  state?: string;
  city: string;
  church: string;
  occupation?: string;
  biography?: string;
  interests?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalRole: UserRole;
  
  // Actions
  openAuthModal: (roleTarget?: UserRole) => void;
  closeAuthModal: () => void;
  login: (email: string, role: UserRole, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (role: UserRole) => Promise<boolean>;
  completeOnboarding: (data: OnboardingData) => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkServerPermission: (requiredRole: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const fetchUserProfile = async (userId: string, email: string): Promise<UserProfile> => {
  // Check localStorage cache first
  let cachedData: Partial<UserProfile> | null = null;
  try {
    const raw = localStorage.getItem(`ls_profile_${userId}`);
    if (raw) {
      cachedData = JSON.parse(raw);
    }
  } catch {}

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profile && !error) {
      return {
        id: profile.id,
        email: profile.email || email,
        full_name: profile.full_name || profile.display_name || email.split('@')[0],
        role: profile.role || 'student',
        avatar_url: profile.avatar_url,
        current_pillar: profile.current_pillar || 'Grow',
        onboarding_completed: profile.onboarding_completed ?? cachedData?.onboarding_completed ?? false,
        profile_completion_pct: profile.profile_completion_pct ?? cachedData?.profile_completion_pct ?? (profile.onboarding_completed ? 100 : 20),
        biography: profile.biography || cachedData?.biography,
        phone: profile.phone || cachedData?.phone,
        gender: profile.gender || cachedData?.gender,
        date_of_birth: profile.date_of_birth || cachedData?.date_of_birth,
        country: profile.country || cachedData?.country || 'Nigeria',
        state: profile.state || cachedData?.state,
        city: profile.city || cachedData?.city,
        location: profile.location || cachedData?.location || (profile.city ? `${profile.city}, ${profile.country || 'Nigeria'}` : 'Lagos, Nigeria'),
        occupation: profile.occupation || cachedData?.occupation,
        fellowship: profile.fellowship || cachedData?.fellowship,
        created_at: profile.created_at,
      };
    }
  } catch (err) {
    console.warn('Profiles table query skipped:', err);
  }

  try {
    const { data: adminProfile, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (adminProfile && !error) {
      return {
        id: adminProfile.id,
        email: adminProfile.email,
        full_name: adminProfile.full_name,
        role: 'admin',
        current_pillar: 'Multiply',
        onboarding_completed: true,
        profile_completion_pct: 100,
      };
    }
  } catch (err) {
    console.warn('Admin profiles query skipped:', err);
  }

  try {
    const { data: studentProfile, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (studentProfile && !error) {
      return {
        id: studentProfile.id,
        email: studentProfile.email,
        full_name: studentProfile.full_name,
        role: 'student',
        avatar_url: studentProfile.avatar_url,
        current_pillar: studentProfile.current_pillar,
        onboarding_completed: (studentProfile as any).onboarding_completed ?? cachedData?.onboarding_completed ?? false,
        profile_completion_pct: (studentProfile as any).profile_completion_pct ?? cachedData?.profile_completion_pct ?? 20,
      };
    }
  } catch (err) {
    console.warn('Student profiles query skipped:', err);
  }

  return {
    id: userId,
    email,
    full_name: cachedData?.full_name || email.split('@')[0].replace('.', ' ').toUpperCase(),
    role: 'student',
    current_pillar: 'Grow',
    onboarding_completed: cachedData?.onboarding_completed ?? false,
    profile_completion_pct: cachedData?.profile_completion_pct ?? 20,
    phone: cachedData?.phone,
    country: cachedData?.country || 'Nigeria',
    state: cachedData?.state,
    city: cachedData?.city,
    location: cachedData?.location || 'Lagos, Nigeria',
    fellowship: cachedData?.fellowship,
    occupation: cachedData?.occupation,
    biography: cachedData?.biography,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>('public');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('student');

  useEffect(() => {
    // Check initial Supabase auth session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || (await supabase.auth.getUser()).data?.user;
        if (activeUser) {
          const profile = await fetchUserProfile(activeUser.id, activeUser.email || '');
          setUser(profile);
          setRole(profile.role);
        }
      } catch (err) {
        console.warn('Supabase auth session fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id, session.user.email || '');
        setUser(profile);
        setRole(profile.role);
      } else {
        setUser(null);
        setRole('public');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (targetRole: UserRole = 'student') => {
    setAuthModalRole(targetRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = async (email: string, userRole: UserRole, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (!password || password.trim().length === 0) {
        return { success: false, error: 'Password is required to sign in.' };
      }

      const signInRes = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInRes.error || !signInRes.data.user) {
        const errorMsg = signInRes.error?.message || 'Invalid email or password. Please verify your credentials.';
        setUser(null);
        setRole('public');
        return { success: false, error: errorMsg };
      }

      const authUser = signInRes.data.user;
      const profile = await fetchUserProfile(authUser.id, authUser.email || email);
      const activeRole = profile.role || userRole;
      setUser({ ...profile, role: activeRole });
      setRole(activeRole);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      console.error('Supabase Auth Login Exception:', err);
      setUser(null);
      setRole('public');
      return { success: false, error: err?.message || 'An unexpected authentication error occurred.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'disciple',
          },
        },
      });

      if (error || !data.user) {
        return { success: false, error: error?.message || 'Failed to create account. Please try again.' };
      }

      const profile = await fetchUserProfile(data.user.id, email);
      setUser({ ...profile, full_name: fullName, role: 'student' });
      setRole('student');
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      console.error('Supabase Sign Up Exception:', err);
      return { success: false, error: err?.message || 'An unexpected registration error occurred.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (targetRole: UserRole = 'student'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.warn('Supabase OAuth notice:', error.message);
      }
      return true;
    } catch (err) {
      console.warn('Google sign in handler:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data: OnboardingData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const userId = user?.id || (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        return { success: false, error: 'No active authenticated session found.' };
      }

      const updates: Partial<UserProfile> = {
        full_name: data.fullName,
        phone: data.phone,
        country: data.country || 'Nigeria',
        state: data.state || '',
        city: data.city || '',
        location: data.city && data.country ? `${data.city}, ${data.country}` : (data.city || 'Lagos, Nigeria'),
        fellowship: data.church,
        occupation: data.occupation || '',
        biography: data.biography || '',
        onboarding_completed: true,
        profile_completion_pct: 100,
      };

      // 1. Update in Supabase profiles table
      try {
        const { error: dbError } = await supabase
          .from('profiles')
          .update({
            display_name: data.fullName,
            full_name: data.fullName,
            phone: data.phone,
            country: data.country || 'Nigeria',
            state: data.state || '',
            city: data.city || '',
            location: updates.location,
            fellowship: data.church,
            occupation: data.occupation || '',
            biography: data.biography || '',
            onboarding_completed: true,
            profile_completion_pct: 100,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (dbError) {
          console.warn('Profiles table update notice:', dbError.message);
        }
      } catch (dbErr) {
        console.warn('Supabase DB update skipped/offline:', dbErr);
      }

      // 2. Persist to localStorage cache
      try {
        const currentCached = localStorage.getItem(`ls_profile_${userId}`);
        const parsed = currentCached ? JSON.parse(currentCached) : {};
        localStorage.setItem(`ls_profile_${userId}`, JSON.stringify({
          ...parsed,
          ...user,
          ...updates,
        }));
      } catch (storageErr) {
        console.warn('LocalStorage caching error:', storageErr);
      }

      // 3. Update active user in state
      if (user) {
        setUser({
          ...user,
          ...updates,
          onboarding_completed: true,
          profile_completion_pct: 100,
        });
      } else {
        const profile = await fetchUserProfile(userId, 'disciple@livelystone.org');
        setUser({
          ...profile,
          ...updates,
          onboarding_completed: true,
          profile_completion_pct: 100,
        });
      }

      return { success: true };
    } catch (err: any) {
      console.error('Complete onboarding exception:', err);
      return { success: false, error: err?.message || 'Failed to complete profile onboarding.' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const userId = user?.id || (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        return { success: false, error: 'No active session found.' };
      }

      try {
        await supabase
          .from('profiles')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);
      } catch (err) {
        console.warn('Profiles update skipped:', err);
      }

      if (user) {
        setUser({ ...user, ...updates });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update profile.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    supabase.auth.signOut().catch(() => {});
    setUser(null);
    setRole('public');
  };

  // Server-side & Client RPC Permission Verification
  const checkServerPermission = async (requiredRole: UserRole): Promise<boolean> => {
    if (requiredRole === 'public') return true;

    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('check_user_permission', {
        required_role: requiredRole
      });

      if (!error && typeof data === 'boolean') {
        return data;
      }
    } catch (err) {
      console.warn('RPC check fallback to client role evaluation:', err);
    }

    if (requiredRole === 'admin') {
      return role === 'admin';
    }
    if (requiredRole === 'student') {
      return role === 'student' || role === 'admin';
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user && role !== 'public',
        isLoading,
        isAuthModalOpen,
        authModalRole,
        openAuthModal,
        closeAuthModal,
        login,
        signUp,
        signInWithGoogle,
        completeOnboarding,
        updateUserProfile,
        logout,
        checkServerPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
