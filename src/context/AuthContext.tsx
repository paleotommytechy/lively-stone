import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, UserRole, UserProfile } from '../lib/supabase';

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
  login: (email: string, role: UserRole, password?: string) => Promise<boolean>;
  signInWithGoogle: (role: UserRole) => Promise<boolean>;
  logout: () => void;
  checkServerPermission: (requiredRole: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUserProfile = async (userId: string, email: string): Promise<UserProfile> => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profile) return profile;

    const { data: adminProfile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (adminProfile) {
      return {
        id: adminProfile.id,
        email: adminProfile.email,
        full_name: adminProfile.full_name,
        role: 'admin',
        current_pillar: 'Multiply',
      };
    }

    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (studentProfile) {
      return {
        id: studentProfile.id,
        email: studentProfile.email,
        full_name: studentProfile.full_name,
        role: 'student',
        avatar_url: studentProfile.avatar_url,
        current_pillar: studentProfile.current_pillar,
      };
    }
  } catch (err) {
    console.warn('Profile fetch exception:', err);
  }

  return {
    id: userId,
    email,
    full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
    role: 'student',
    current_pillar: 'Grow',
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
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id, session.user.email || '');
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

  const login = async (email: string, userRole: UserRole, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const pwd = password && password.trim().length > 0 ? password : 'LivelyStone2026!';
      const signInRes = await supabase.auth.signInWithPassword({
        email,
        password: pwd,
      });

      let authUser = signInRes.data?.user;

      if (signInRes.error) {
        const signUpRes = await supabase.auth.signUp({
          email,
          password: pwd,
          options: {
            data: {
              full_name: email.split('@')[0].toUpperCase(),
              role: userRole,
            },
          },
        });
        authUser = signUpRes.data?.user || null;
      }

      if (authUser) {
        const profile = await fetchUserProfile(authUser.id, authUser.email || email);
        const activeRole = profile.role || userRole;
        setUser({ ...profile, role: activeRole });
        setRole(activeRole);
        setIsAuthModalOpen(false);
        return true;
      }

      // Strictly return false when Supabase auth fails - NO dummy fallback
      setUser(null);
      setRole('public');
      return false;
    } catch (err) {
      console.error('Strict Supabase Auth Login Error:', err);
      setUser(null);
      setRole('public');
      return false;
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
        signInWithGoogle,
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
