/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          light: 'rgba(15,23,42,0.85)',
          dark: 'rgba(15,23,42,0.94)',
        },
        primary: {
          DEFAULT: '#6366F1',
          softer: '#4F46E5',
        },
        accent: {
          blue: '#22D3EE',
          purple: '#A855F7',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 60px rgba(129, 140, 248, 0.6)',
        'glow-blue': '0 0 60px rgba(56, 189, 248, 0.5)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top left, rgba(129,140,248,0.5), transparent 55%), radial-gradient(circle at bottom right, rgba(56,189,248,0.4), transparent 55%)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.55))',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
}

