/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'sans-serif',
        ],
        serif: ['"SF Pro Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        palette: {
          bg: '#F0F4F8',
          primary: '#3B82F6',
          secondary: '#E0ECF8',
          text: '#0F172A',
        },
        ios: {
          bg: {
            light: '#F4F7FC',
            dark: '#030712',
          },
          card: {
            light: '#FFFFFF',
            dark: '#0F172A',
          },
          blue: '#3B82F6',
          cyan: '#06B6D4',
          indigo: '#6366F1',
          purple: '#A855F7',
          amber: '#F59E0B',
          emerald: '#10B981',
          slate: '#0F172A',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.18)',
          'border-dark': 'rgba(255, 255, 255, 0.10)',
          light: 'rgba(255, 255, 255, 0.65)',
          dark: 'rgba(15, 23, 42, 0.72)',
          highlight: 'rgba(255, 255, 255, 0.35)',
        }
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        'ios': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'ios-lg': '0 12px 40px -10px rgba(0, 0, 0, 0.08)',
        'ios-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-glow': '0 8px 32px 0 rgba(59, 130, 246, 0.18)',
        'glass-glow-lg': '0 16px 48px 0 rgba(99, 102, 241, 0.25)',
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.35)',
        'amber-glow': '0 0 25px rgba(245, 158, 11, 0.35)',
      },
      backdropBlur: {
        'xs': '4px',
        'ios': '20px',
        'xl': '24px',
        '2xl': '36px',
        '3xl': '48px',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'mesh-drift': 'meshDrift 20s linear infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        meshDrift: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(180deg) scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
};

