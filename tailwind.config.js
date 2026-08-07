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
        forest: {
          50: '#F2F7F4',
          100: '#E1ECE5',
          200: '#C3D9CC',
          300: '#9DBEAA',
          400: '#6E9C80',
          500: '#4A7A5D',
          600: '#345E44',
          700: '#1E3A2B',
          800: '#15291E',
          900: '#0F291E',
          950: '#091A13',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF9E5',
          200: '#FFF0BF',
          300: '#FFE28A',
          400: '#F7D054',
          500: '#D4AF37',
          600: '#B89628',
          700: '#96781C',
          800: '#755C17',
          900: '#544212',
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

