import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, ArrowRight, Shield, Sparkles, CheckSquare, Square, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { MinistryCrestSVG } from '../vectors/MinistryVectors';

const loginSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFields = z.infer<typeof loginSchema>;

interface ProtectedPortalGuardProps {
  requiredRole: 'student' | 'admin';
  children: React.ReactNode;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.15 1.86-1.01 2.96 1.07.08 2.16-.55 2.82-1.36z" />
  </svg>
);

export const ProtectedPortalGuard: React.FC<ProtectedPortalGuardProps> = ({ requiredRole, children }) => {
  const { role, login, signInWithGoogle, checkServerPermission } = useAuth() as any;
  const { setRoleView, setPublicRoute, showToast } = useApp();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    let isMounted = true;

    const verifyPermissions = async () => {
      const isAllowed = await checkServerPermission(requiredRole);
      if (isMounted) {
        setHasPermission(isAllowed);
      }
    };

    verifyPermissions();

    return () => {
      isMounted = false;
    };
  }, [role, requiredRole]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    const success = await signInWithGoogle(requiredRole);
    if (success) {
      setRoleView(requiredRole);
      showToast('Google Sign-In Successful', `Authenticated as ${requiredRole.toUpperCase()} user via Google.`);
      setHasPermission(true);
    } else {
      showToast('Google Sign In Notice', 'Fallback demo session initiated.');
    }
    setIsSubmitting(false);
  };

  const handleAppleSignIn = async () => {
    setIsSubmitting(true);
    const success = await signInWithGoogle(requiredRole);
    if (success) {
      setRoleView(requiredRole);
      showToast('Apple Sign-In Successful', `Authenticated as ${requiredRole.toUpperCase()} user via Apple ID.`);
      setHasPermission(true);
    }
    setIsSubmitting(false);
  };

  const [authError, setAuthError] = useState<string | null>(null);

  const onAuthorizeSubmit = async (data: LoginFields) => {
    setIsSubmitting(true);
    setAuthError(null);
    const res = await login(data.email, requiredRole, data.password);

    if (res.success) {
      setRoleView(requiredRole);
      showToast('Portal Authorization Granted', `Authenticated as authorized ${requiredRole.toUpperCase()} user.`);
      setHasPermission(true);
    } else {
      const errorMsg = res.error || 'Invalid email or password. Please verify your credentials.';
      setAuthError(errorMsg);
      showToast('Authentication Error', errorMsg, 'warning');
    }
    setIsSubmitting(false);
  };

  if (hasPermission === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-4 bg-slate-950">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
          Verifying Portal Authentication...
        </p>
      </div>
    );
  }

  if (!hasPermission) {
    const isStudent = requiredRole === 'student';

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none bg-[#030712] animate-ios-fade-in">
        
        {/* Background Image Layer */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('/bg01.jpg')` }}
        />
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-0 pointer-events-none" />

        {/* Background Ambient Glow Effects */}
        {isStudent ? (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 tech-grid-bg">
            <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-cyan-500/20 blur-[140px] animate-pulse-slow" />
            <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[150px] animate-mesh-drift" />
            <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[130px]" />
          </div>
        ) : (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 spotlight-beam">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-4 bg-amber-400/40 rounded-full blur-md spotlight-lamp" />
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-amber-500/15 blur-[140px] animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-orange-600/10 blur-[130px]" />
          </div>
        )}

        {/* Single Standalone Animated Login Card */}
        <div className={`relative z-10 w-full max-w-md rounded-3xl sm:rounded-4xl p-5 sm:p-7 shadow-2xl backdrop-blur-2xl border transition-all duration-300 animate-spring-up ${
          isStudent 
            ? 'border-cyan-500/30 dark:border-cyan-400/40 bg-slate-900/85 text-white shadow-cyan-500/10' 
            : 'border-amber-500/30 dark:border-amber-400/40 bg-slate-950/90 text-white shadow-amber-500/10'
        }`}>

          {/* Internal Shimmer Corner Glow */}
          <div className={`absolute -top-20 -left-20 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
            isStudent ? 'bg-cyan-500/20' : 'bg-amber-500/20'
          }`} />

          {/* Card Header Row: Logo & Close Button */}

          {/* Title & Logo Crest */}
          <div className="text-center space-y-1.5 relative z-10 pt-1">
            <div className={`w-12 h-12 mx-auto rounded-2xl glass-pill flex items-center justify-center border text-white shadow-lg ${
              isStudent ? 'border-cyan-400/30 text-cyan-300' : 'border-amber-400/30 text-amber-400'
            }`}>
              {isStudent ? <MinistryCrestSVG className="w-7 h-7" /> : <Shield className="w-6 h-6 text-amber-400" />}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {isStudent ? 'Student Login' : 'Admin Login'}
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Enter your credentials to access your portal.
            </p>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit(onAuthorizeSubmit)} className="space-y-3.5 text-left relative z-10">
            {/* Inline Error Alert Banner */}
            {authError && (
              <div className="p-3 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 shadow-lg animate-ios-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium leading-relaxed">
                  <span className="font-bold block text-red-300">Authentication Failed</span>
                  {authError}
                </div>
                <button
                  type="button"
                  onClick={() => setAuthError(null)}
                  className="text-red-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email')}
                  placeholder={isStudent ? 'student@livelystone.org' : 'admin@livelystone.org'}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-400 font-medium pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-900/90 border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                  }`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-400 font-medium pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                {rememberMe ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span className="text-[11px]">Remember me</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Password Recovery', 'Check your email for password reset steps.')}
                className="text-[11px] text-cyan-300 hover:text-cyan-200 transition-colors font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Login CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xl transition-all ios-active active:scale-98 border border-white/20 ${
                isStudent
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-cyan-500/30'
                  : 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/30'
              }`}
            >
              {isSubmitting ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    );
  }

  return <>{children}</>;
};
