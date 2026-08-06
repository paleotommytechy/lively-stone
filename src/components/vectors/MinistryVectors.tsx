import React from 'react';

interface VectorProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Lively Stone Official Ministry Crest & Emblem Vector
 */
export const MinistryCrestSVG: React.FC<VectorProps> = ({ className = 'w-12 h-12', size, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="crestCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="crestNavy" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#090D16" />
      </linearGradient>
      <radialGradient id="sunburstGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Outer Glow Halo */}
    <circle cx="50" cy="50" r="46" fill="url(#sunburstGlow)" />

    {/* Outer Crest Ring */}
    <circle cx="50" cy="50" r="44" stroke="url(#crestGold)" strokeWidth="2.5" strokeDasharray="6 3" />
    <circle cx="50" cy="50" r="40" stroke="url(#crestCyan)" strokeWidth="1.5" opacity="0.8" />

    {/* Shield Base Shape */}
    <path
      d="M50 14 C68 14, 80 22, 80 42 C80 66, 50 86, 50 86 C50 86, 20 66, 20 42 C20 22, 32 14, 50 14 Z"
      fill="url(#crestNavy)"
      stroke="url(#crestGold)"
      strokeWidth="2.5"
    />

    {/* Inner Sunburst Rays */}
    <path d="M50 20 L50 44 M50 44 L32 30 M50 44 L68 30 M50 44 L34 56 M50 44 L66 56" stroke="url(#crestCyan)" strokeWidth="1" opacity="0.4" />

    {/* Lively Stone Foundation Blocks */}
    <path d="M34 68 L66 68 L62 74 L38 74 Z" fill="url(#crestGold)" />
    <path d="M38 62 L62 62 L58 67 L42 67 Z" fill="url(#crestCyan)" opacity="0.9" />

    {/* Open Bible Symbol */}
    <path
      d="M34 46 C42 42, 48 44, 50 47 C52 44, 58 42, 66 46 L66 60 C58 56, 52 58, 50 61 C48 58, 42 56, 34 60 Z"
      fill="#F8FAFC"
      stroke="url(#crestNavy)"
      strokeWidth="1"
    />

    {/* Kingdom Cross & Crown Peak */}
    <path d="M50 24 L50 38 M43 30 L57 30" stroke="url(#crestGold)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="22" r="2.5" fill="#FBBF24" />
  </svg>
);

/**
 * 6 Growth Pillars & Sacred Foundation Stone Vector
 */
export const SacredStonePillarSVG: React.FC<VectorProps> = ({ className = 'w-10 h-10', size, ...props }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} {...props}>
    <defs>
      <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
    {/* Base Stone Platform */}
    <rect x="10" y="64" width="60" height="10" rx="3" fill="url(#goldCap)" />
    <rect x="16" y="56" width="48" height="8" rx="2" fill="#1E293B" stroke="url(#pillarGrad)" strokeWidth="1.5" />

    {/* 3 Main Classical Pillars */}
    <rect x="22" y="24" width="8" height="32" rx="1.5" fill="url(#pillarGrad)" />
    <rect x="36" y="18" width="8" height="38" rx="1.5" fill="url(#pillarGrad)" />
    <rect x="50" y="24" width="8" height="32" rx="1.5" fill="url(#pillarGrad)" />

    {/* Pillar Capitals */}
    <path d="M18 24 L34 24 L30 20 L22 20 Z" fill="url(#goldCap)" />
    <path d="M32 18 L48 18 L44 14 L36 14 Z" fill="url(#goldCap)" />
    <path d="M46 24 L62 24 L58 20 L50 20 Z" fill="url(#goldCap)" />

    {/* Top Triangular Pediment */}
    <path d="M14 14 L40 4 L66 14 Z" fill="none" stroke="url(#goldCap)" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="40" cy="9" r="2" fill="#FBBF24" />
  </svg>
);

/**
 * Kingdom Apostolic Shield Vector
 */
export const KingdomShieldSVG: React.FC<VectorProps> = ({ className = 'w-10 h-10', size, ...props }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} {...props}>
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284C7" />
        <stop offset="50%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#090D16" />
      </linearGradient>
    </defs>
    <path
      d="M40 8 C56 8, 68 14, 68 32 C68 54, 40 72, 40 72 C40 72, 12 54, 12 32 C12 14, 24 8, 40 8 Z"
      fill="url(#shieldGrad)"
      stroke="#38BDF8"
      strokeWidth="2.5"
    />
    <path d="M40 16 L40 62 M22 32 L58 32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="32" r="6" fill="#0284C7" stroke="#FBBF24" strokeWidth="1.5" />
  </svg>
);

/**
 * Discipleship Crown Vector
 */
export const DiscipleshipCrownSVG: React.FC<VectorProps> = ({ className = 'w-10 h-10', size, ...props }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} {...props}>
    <defs>
      <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <path
      d="M14 56 L18 26 L32 40 L40 18 L48 40 L62 26 L66 56 Z"
      fill="url(#crownGoldGrad)"
      stroke="#FEF08A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="14" y="56" width="52" height="10" rx="3" fill="#B45309" stroke="#FDE047" strokeWidth="2" />
    <circle cx="18" cy="24" r="3" fill="#38BDF8" />
    <circle cx="40" cy="16" r="4" fill="#F43F5E" />
    <circle cx="62" cy="24" r="3" fill="#38BDF8" />
    <circle cx="40" cy="61" r="2.5" fill="#FEF08A" />
  </svg>
);

/**
 * Holy Ghost Fire & Revival Vector
 */
export const ApostolicFireSVG: React.FC<VectorProps> = ({ className = 'w-10 h-10', size, ...props }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} {...props}>
    <defs>
      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
    </defs>
    <path
      d="M40 8 C40 8, 48 22, 48 34 C48 42, 56 46, 56 56 C56 66, 48 72, 40 72 C32 72, 24 66, 24 56 C24 44, 34 36, 34 26 C34 18, 40 8, 40 8 Z"
      fill="url(#fireGrad)"
    />
    <path
      d="M40 30 C40 30, 44 40, 44 46 C44 52, 48 54, 48 60 C48 66, 44 68, 40 68 C36 68, 32 66, 32 60 C32 52, 38 48, 38 42 C38 36, 40 30, 40 30 Z"
      fill="#FEF08A"
      opacity="0.9"
    />
  </svg>
);
