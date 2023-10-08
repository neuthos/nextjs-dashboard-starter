/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontSize: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      h4: '1.25rem',
      h5: '1rem',
      h6: '0.875rem',
      h7: '0.75rem',
      paragraph: '1.0625rem',
      body: '0.875rem',
      small: '0.75rem',
    },
    extend: {
      colors: {
        primary: {
          500: '#5D15ED',
          700: '#380D8E',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        whiteCustom: {
          20: '#E6E6E6',
          30: '#CCCCCC',
        },
        muted: {
          500: '#627884',
          400: '#81939D',
        },
        success: {
          600: '#007A08',
        },
      },
    },
  },
  plugins: [],
};
