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
          '-apple-system',
          'BlinkMacSystemFont',
          '"Plus Jakarta Sans"',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"SF Pro Serif"', 'Georgia', 'serif'],
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
            light: '#F0F4F8',
            dark: '#000000',
          },
          card: {
            light: '#FFFFFF',
            dark: '#1C1C1E',
          },
          blue: '#3B82F6',
          indigo: '#5856D6',
          purple: '#AF52DE',
          amber: '#F59E0B',
          slate: '#0F172A',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'ios': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'ios-lg': '0 12px 40px -10px rgba(0, 0, 0, 0.08)',
        'ios-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        'ios': '20px',
      }
    },
  },
  plugins: [],
};
