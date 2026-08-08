import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { User } from 'lucide-react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarContextValue {
  src?: string | null;
  alt?: string;
  name?: string;
  initials?: string;
  hasError: boolean;
  setHasError: (err: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  size?: AvatarSize;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

/**
 * Extracts clean, readable 1-2 letter initials from a person's name or email.
 * E.g.:
 * - "Ifeoluwa Olusegun" -> "IO"
 * - "Saint Abraham Babatunde" -> "AB"
 * - "Praise Wilson" -> "PW"
 * - "David" -> "D"
 * - "david@livelystones.org" -> "D"
 */
export function getInitials(name?: string | null): string {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (!trimmed) return '';

  // If email passed as name
  if (trimmed.includes('@')) {
    const userPart = trimmed.split('@')[0].replace(/[._-]/g, ' ').trim();
    return getInitials(userPart);
  }

  // Remove common ceremonial prefixes for initials if multiple words exist
  const cleanedName = trimmed.replace(/^(saint|pastor|minister|brother|sister|bro|sis|dr|mr|mrs|ms)\.?\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    const fallbackParts = trimmed.split(/\s+/).filter(Boolean);
    if (fallbackParts.length === 0) return '';
    return fallbackParts[0].charAt(0).toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Deterministic background color generator for initials avatar to provide
 * vibrant, harmonious, distinct color palettes across student cards.
 */
function getInitialsColorClasses(name?: string | null): string {
  if (!name) return 'bg-forest-900 text-gold-400 border-forest-700/80';
  
  const colors = [
    'bg-amber-500/20 text-amber-300 border-amber-500/40 dark:bg-amber-950/60 dark:text-gold-400 dark:border-gold-500/40',
    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-500/40',
    'bg-blue-500/20 text-blue-300 border-blue-500/40 dark:bg-blue-950/60 dark:text-cyan-400 dark:border-blue-500/40',
    'bg-purple-500/20 text-purple-300 border-purple-500/40 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-500/40',
    'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-500/40',
    'bg-forest-800 text-gold-400 border-forest-700 dark:bg-forest-900 dark:text-gold-400 dark:border-forest-700',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; icon: string }> = {
  xs: {
    container: 'w-6 h-6',
    text: 'text-[10px] font-bold',
    icon: 'w-3.5 h-3.5',
  },
  sm: {
    container: 'w-8 h-8',
    text: 'text-xs font-bold',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'w-10 h-10',
    text: 'text-sm font-bold',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'w-12 h-12',
    text: 'text-base font-bold',
    icon: 'w-6 h-6',
  },
  xl: {
    container: 'w-16 h-16 sm:w-20 sm:h-20',
    text: 'text-lg sm:text-xl font-bold',
    icon: 'w-8 h-8 sm:w-10 sm:h-10',
  },
  '2xl': {
    container: 'w-20 h-20 sm:w-24 sm:h-24',
    text: 'text-xl sm:text-2xl font-bold',
    icon: 'w-10 h-10 sm:w-12 sm:h-12',
  },
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string | null;
  initials?: string;
  size?: AvatarSize;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  status?: 'online' | 'active' | 'present' | 'offline' | null;
  statusClassName?: string;
  children?: React.ReactNode;
}

/**
 * Main Avatar Component
 * Handles both standalone usage (via src & name props) and compound usage with AvatarImage and AvatarFallback.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  initials: explicitInitials,
  size,
  className = '',
  imageClassName = '',
  fallbackClassName = '',
  status,
  statusClassName = '',
  children,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if src is valid string (not null, undefined, empty, or pure whitespace)
  const isValidSrc = useMemo(() => {
    if (!src || typeof src !== 'string') return false;
    const trimmed = src.trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return false;
    return true;
  }, [src]);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const computedInitials = useMemo(() => {
    if (explicitInitials) return explicitInitials;
    return getInitials(name);
  }, [explicitInitials, name]);

  const sizeStyle = size ? sizeClasses[size] : null;
  const containerSizeClass = sizeStyle ? sizeStyle.container : '';

  const contextValue = useMemo<AvatarContextValue>(() => ({
    src: isValidSrc ? src : null,
    alt: alt || name || 'Avatar',
    name: name || undefined,
    initials: computedInitials,
    hasError: hasError || !isValidSrc,
    setHasError,
    isLoaded,
    setIsLoaded,
    size,
  }), [src, isValidSrc, alt, name, computedInitials, hasError, isLoaded, size]);

  const showFallback = !isValidSrc || hasError;

  return (
    <AvatarContext.Provider value={contextValue}>
      <div
        className={`relative inline-flex shrink-0 items-center justify-center rounded-full select-none overflow-hidden ${containerSizeClass} ${className}`}
        role="img"
        aria-label={alt || name || 'User avatar'}
        title={name || alt || undefined}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <>
            {isValidSrc && !hasError && (
              <img
                src={src!}
                alt={alt || name || 'Avatar'}
                className={`w-full h-full object-cover rounded-full ${imageClassName}`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            )}
            {showFallback && (
              <AvatarFallback
                name={name}
                initials={computedInitials}
                size={size}
                className={fallbackClassName}
              />
            )}
          </>
        )}

        {/* Optional Status Indicator Badge */}
        {status && (
          <span
            className={`absolute bottom-0 right-0 rounded-full border-2 border-forest-950 dark:border-forest-950 ${
              size === 'xs'
                ? 'w-2 h-2'
                : size === 'sm'
                ? 'w-2.5 h-2.5'
                : size === 'xl' || size === '2xl'
                ? 'w-4 h-4'
                : 'w-3 h-3'
            } ${
              status === 'online' || status === 'present' || status === 'active'
                ? 'bg-emerald-400'
                : 'bg-slate-400'
            } ${statusClassName}`}
            aria-hidden="true"
          />
        )}
      </div>
    </AvatarContext.Provider>
  );
};

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

/**
 * AvatarImage component for compound usage
 */
export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  className = '',
  onError,
  onLoad,
  ...props
}) => {
  const context = useContext(AvatarContext);
  const effectiveSrc = src !== undefined ? src : context?.src;
  const effectiveAlt = alt || context?.alt || 'Avatar';

  const isValid = useMemo(() => {
    if (!effectiveSrc || typeof effectiveSrc !== 'string') return false;
    const trimmed = effectiveSrc.trim();
    return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined';
  }, [effectiveSrc]);

  if (!isValid || context?.hasError) {
    return null;
  }

  return (
    <img
      src={effectiveSrc!}
      alt={effectiveAlt}
      className={`w-full h-full object-cover rounded-full ${className}`}
      onLoad={(e) => {
        context?.setIsLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        context?.setHasError(true);
        onError?.(e);
      }}
      {...props}
    />
  );
};

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null;
  initials?: string;
  size?: AvatarSize;
  className?: string;
  children?: React.ReactNode;
}

/**
 * AvatarFallback component for compound usage or default fallback display.
 * Displays user initials with styled background or a neutral user icon.
 */
export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  name: explicitName,
  initials: explicitInitials,
  size: explicitSize,
  className = '',
  children,
  ...props
}) => {
  const context = useContext(AvatarContext);
  const name = explicitName !== undefined ? explicitName : context?.name;
  const size = explicitSize || context?.size;

  const initials = useMemo(() => {
    if (explicitInitials) return explicitInitials;
    if (context?.initials) return context.initials;
    return getInitials(name);
  }, [explicitInitials, context?.initials, name]);

  const sizeStyle = size ? sizeClasses[size] : null;
  const textSizeClass = sizeStyle ? sizeStyle.text : 'text-xs font-bold';
  const iconSizeClass = sizeStyle ? sizeStyle.icon : 'w-4 h-4';
  const colorClasses = useMemo(() => getInitialsColorClasses(name), [name]);

  // If compound children are provided, render them
  if (children) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-full font-mono uppercase border ${colorClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full font-mono uppercase tracking-wider border shadow-inner ${colorClasses} ${textSizeClass} ${className}`}
      {...props}
    >
      {initials ? (
        <span>{initials}</span>
      ) : (
        <User className={`${iconSizeClass} opacity-80`} aria-hidden="true" />
      )}
    </div>
  );
};
