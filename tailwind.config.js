/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        fairway: {
          DEFAULT: '#0c3d2c',
          light: '#145a42',
          pale: '#e4f0eb',
          deep: '#071f17',
        },
        gold: {
          DEFAULT: '#c9a24a',
          light: '#ddb85c',
          dark: '#8f732e',
        },
        sand: '#f3ead7',
        midnight: '#0a1628',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(12, 61, 44, 0.08), 0 2px 8px rgba(10, 22, 40, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
        lift: '0 20px 50px -20px rgba(12, 61, 44, 0.25)',
        glow: '0 0 60px rgba(201, 162, 74, 0.15)',
      },
      backgroundImage: {
        'mesh-page':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 162, 74, 0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(12, 61, 44, 0.08), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(12, 61, 44, 0.06), transparent)',
        'hero-radial':
          'radial-gradient(circle at 30% 20%, rgba(201, 162, 74, 0.18), transparent 45%), radial-gradient(circle at 80% 60%, rgba(12, 61, 44, 0.15), transparent 50%)',
      },
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 14s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -16px) scale(1.03)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-16px, 12px) scale(1.02)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
