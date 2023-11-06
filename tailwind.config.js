/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-marianne)',
      },
      colors: {
        primary: {
          /**
           * Background neutral
           */
          100: '#F6F3F8',
          /**
           * Background element point of interest
           */
          200: '#E8DFEE',
          /**
           * Hover
           */
          400: '#6D418F',
          /**
           * Main elements or text
           */
          500: '#491273',
          /**
           * Darker text
           */
          700: '#3A0E5B',
          800: '#2A0A42',
        },
        // primaryLight: '#E8DFEE',
        primaryLight: '#F6F3F8',
        primaryDark: '#6D418F',
        primaryBorder: '#2A0A42',
        secondary: '#D40983',
        lightGrey: '#F8F8F7',
        default: '#111',
        grey: {
          100: '#F8F8F7',
          200: '#E3E3DB',
        },
      },
      keyframes: {
        valuechange: {
          '0%': { opacity: 0, transform: 'translateX(-10%)' },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(10%)' },
        },
      },
      animation: {
        valuechange: 'valuechange 3s ease-out infinite',
      },
    },
  },
  plugins: [],
}
