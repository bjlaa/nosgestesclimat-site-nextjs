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
          50: '#f0f4fd',
          100: '#e3ebfc',
          200: '#cdd9f8',
          300: '#afbff2',
          400: '#8e9eeb',
          500: '#737de1',
          600: '#585ad3',
          700: '#4949ba',
          800: '#3d3f96',
          900: '#373978',
          950: '#202046',
        },
        secondary: {
          50: '#fef1fa',
          100: '#fde6f7',
          200: '#feccf1',
          300: '#ffa2e4',
          400: '#fd69d0',
          500: '#f73dba',
          600: '#e81a9b',
          700: '#d40d83',
          800: '#a60e66',
          900: '#8b1058',
          950: '#550232',
        },
        transport: {
          50: '#eff7ff',
          100: '#dbecfe',
          200: '#bfdffe',
          300: '#a2d2fd', // Default
          400: '#60aefa',
          500: '#3c8cf5',
          600: '#266eea',
          700: '#1e58d7',
          800: '#1e48af',
          900: '#1e408a',
          950: '#172854',
        },
        alimentation: {
          50: '#fff7ed',
          100: '#ffeed5',
          200: '#ffd8a9',
          300: '#febc73',
          400: '#fda354', // Default
          500: '#fb7714',
          600: '#ec5b0a',
          700: '#c4430a',
          800: '#9b3511',
          900: '#7d2f11',
          950: '#441506',
        },
        logement: {
          50: '#f2fbf3',
          100: '#e2f6e5',
          200: '#c6eccc',
          300: '#9adba5',
          400: '#6bc47b', // Default
          500: '#41a653',
          600: '#318841',
          700: '#296c36',
          800: '#25562f',
          900: '#204728',
          950: '#0d2612',
        },
        divers: {
          50: '#fffbeb',
          100: '#fdf1c8',
          200: '#fbe38c',
          300: '#f9cd49', // Default
          400: '#f8ba27',
          500: '#f1990f',
          600: '#d67409',
          700: '#b1500c',
          800: '#903f10',
          900: '#763311',
          950: '#441904',
        },
        servicessocietaux: {
          50: '#f4f4fe',
          100: '#eceafd',
          200: '#dbd8fc',
          300: '#c0b8fa',
          400: '#9e8ef5', // Default
          500: '#8063ef',
          600: '#6e42e5',
          700: '#5f30d1',
          800: '#4f27b0',
          900: '#422290',
          950: '#281461',
        },
        water: '#5152D0',
        default: '#1A1A1A',
        gray: {
          100: '#F7FBFF',
          200: '#E3E3DB',
        },
        categories: {
          transport: '#A2D2FD',
          alimentation: '#FDA354',
          logement: '#6BC47B',
          divers: '#F9CD49',
          servicessocietaux: '#9E8EF5',
        },
      },
      fontSize: {
        '3xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        valuechange: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '20%': { opacity: 0.3 },
          '80%': { opacity: 1 },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        iconsRotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rainbow: {
          '0%': {
            'background-position': '100% 50%',
          },
          '50%': {
            'background-position': '50% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        jump: {
          'from, 20%, 53%, to': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            'animation-timing-function':
              'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -30px, 0) scaleY(1.1)',
          },
          '70%': {
            'animation-timing-function':
              'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -15px, 0) scaleY(1.05)',
          },
          '80%': {
            'transition-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0) scaleY(0.95)',
          },
          '90%': {
            transform: 'translate3d(0, -4px, 0) scaleY(1.02)',
          },
        },
        swim: {
          from: {
            transform: 'translateX(-10vw)',
          },
          to: {
            transform: 'translateX(110vw)',
          },
        },
        swimDelay: {
          from: {
            transform: 'translateX(-10vw)',
          },
          '48%': {
            transform: 'translateX(-10vw)',
          },
          '50%': {
            transform: 'translateX(110vw)',
          },
          '98%': {
            transform: 'translateX(110vw)',
          },
          to: {
            transform: 'translateX(-10vw)',
          },
        },
        swimBackwards: {
          from: {
            transform: 'translateX(110vw)',
          },
          to: {
            transform: 'translateX(-10vw)',
          },
        },
      },
      animation: {
        valuechange: 'valuechange 0.7s ease-out forwards',
        iconsRotation: 'iconsRotation 1s ease-in-out',
        'rainbow-slow': 'rainbow 30s linear infinite',
        'rainbow-fast': 'rainbow 5s linear infinite',
        jump: 'jump 1s infinite',
        swim: 'swim 10s linear infinite',
        'swim-delay': 'swimDelay 240s linear infinite',
        'swim-fast': 'swim 5s linear infinite',
        'swim-slow': 'swim 15s linear infinite',
        'swim-backwards': 'swimBackwards 10s linear infinite',
        'swim-backwards-fast': 'swimBackwards 5s linear infinite',
        'swim-backwards-slow': 'swimBackwards 15s linear infinite',
      },
      backgroundImage: {
        'icons-mobile': "url('/images/misc/mobileIcons.svg')",
      },
      screens: {
        xs: '320px',
        short: { raw: '(max-height: 600px)' },
      },
    },
  },
  safelist: [
    'text-categories-transport',
    'text-categories-alimentation',
    'text-categories-logement',
    'text-categories-divers',
    'text-categories-servicessocietaux',
    'bg-categories-transport',
    'bg-categories-alimentation',
    'bg-categories-logement',
    'bg-categories-divers',
    'bg-categories-servicessocietaux',
    'fill-categories-transport',
    'fill-categories-alimentation',
    'fill-categories-logement',
    'fill-categories-divers',
    'fill-categories-servicessocietaux',
    'border-categories-transport',
    'border-categories-alimentation',
    'border-categories-logement',
    'border-categories-divers',
    'border-categories-servicessocietaux',
    // Categories colours
    'text-transport-50',
    'border-transport-50',
    'fill-transport-50',
    'bg-transport-50',
    'text-transport-100',
    'border-transport-100',
    'fill-transport-100',
    'bg-transport-100',
    'text-transport-200',
    'border-transport-200',
    'fill-transport-200',
    'bg-transport-200',
    'text-transport-300',
    'border-transport-300',
    'fill-transport-300',
    'bg-transport-300',
    'text-transport-400',
    'border-transport-400',
    'fill-transport-400',
    'bg-transport-400',
    'text-transport-500',
    'border-transport-500',
    'fill-transport-500',
    'bg-transport-500',
    'text-transport-600',
    'border-transport-600',
    'fill-transport-600',
    'bg-transport-600',
    'text-transport-700',
    'border-transport-700',
    'fill-transport-700',
    'bg-transport-700',
    'text-transport-800',
    'border-transport-800',
    'fill-transport-800',
    'bg-transport-800',
    'text-transport-900',
    'border-transport-900',
    'fill-transport-900',
    'bg-transport-900',
    'text-transport-950',
    'border-transport-950',
    'fill-transport-950',
    'bg-transport-950',
    'text-alimentation-100',
    'border-alimentation-100',
    'fill-alimentation-100',
    'bg-alimentation-100',
    'text-alimentation-50',
    'border-alimentation-50',
    'fill-alimentation-50',
    'bg-alimentation-50',
    'text-alimentation-200',
    'border-alimentation-200',
    'fill-alimentation-200',
    'bg-alimentation-200',
    'text-alimentation-300',
    'border-alimentation-300',
    'fill-alimentation-300',
    'bg-alimentation-300',
    'text-alimentation-400',
    'border-alimentation-400',
    'fill-alimentation-400',
    'bg-alimentation-400',
    'text-alimentation-500',
    'border-alimentation-500',
    'fill-alimentation-500',
    'bg-alimentation-500',
    'text-alimentation-600',
    'border-alimentation-600',
    'fill-alimentation-600',
    'bg-alimentation-600',
    'text-alimentation-700',
    'border-alimentation-700',
    'fill-alimentation-700',
    'bg-alimentation-700',
    'text-alimentation-800',
    'border-alimentation-800',
    'fill-alimentation-800',
    'bg-alimentation-800',
    'text-alimentation-900',
    'border-alimentation-900',
    'fill-alimentation-900',
    'bg-alimentation-900',
    'text-alimentation-950',
    'border-alimentation-950',
    'fill-alimentation-950',
    'bg-alimentation-950',
    // Logement
    'text-logement-50',
    'border-logement-50',
    'fill-logement-50',
    'bg-logement-50',
    'text-logement-100',
    'border-logement-100',
    'fill-logement-100',
    'bg-logement-100',
    'text-logement-200',
    'border-logement-200',
    'fill-logement-200',
    'bg-logement-200',
    'text-logement-300',
    'border-logement-300',
    'fill-logement-300',
    'bg-logement-300',
    'text-logement-400',
    'border-logement-400',
    'fill-logement-400',
    'bg-logement-400',
    'text-logement-500',
    'border-logement-500',
    'fill-logement-500',
    'bg-logement-500',
    'text-logement-600',
    'border-logement-600',
    'fill-logement-600',
    'bg-logement-600',
    'text-logement-700',
    'border-logement-700',
    'fill-logement-700',
    'bg-logement-700',
    'text-logement-800',
    'border-logement-800',
    'fill-logement-800',
    'bg-logement-800',
    'text-logement-900',
    'border-logement-900',
    'fill-logement-900',
    'bg-logement-900',
    'text-logement-950',
    'border-logement-950',
    'fill-logement-950',
    'bg-logement-950',
    // Divers
    'text-divers-50',
    'border-divers-50',
    'fill-divers-50',
    'bg-divers-50',
    'text-divers-100',
    'border-divers-100',
    'fill-divers-100',
    'bg-divers-100',
    'text-divers-200',
    'border-divers-200',
    'fill-divers-200',
    'bg-divers-200',
    'text-divers-300',
    'border-divers-300',
    'fill-divers-300',
    'bg-divers-300',
    'text-divers-400',
    'border-divers-400',
    'fill-divers-400',
    'bg-divers-400',
    'text-divers-500',
    'border-divers-500',
    'fill-divers-500',
    'bg-divers-500',
    'text-divers-600',
    'border-divers-600',
    'fill-divers-600',
    'bg-divers-600',
    'text-divers-700',
    'border-divers-700',
    'fill-divers-700',
    'bg-divers-700',
    'text-divers-800',
    'border-divers-800',
    'fill-divers-800',
    'bg-divers-800',
    'text-divers-900',
    'border-divers-900',
    'fill-divers-900',
    'bg-divers-900',
    'text-divers-950',
    'border-divers-950',
    'fill-divers-950',
    'bg-divers-950',
    // Services sociétaux
    'text-servicessocietaux-50',
    'border-servicessocietaux-50',
    'fill-servicessocietaux-50',
    'bg-servicessocietaux-50',
    'text-servicessocietaux-100',
    'border-servicessocietaux-100',
    'fill-servicessocietaux-100',
    'bg-servicessocietaux-100',
    'text-servicessocietaux-200',
    'border-servicessocietaux-200',
    'fill-servicessocietaux-200',
    'bg-servicessocietaux-200',
    'text-servicessocietaux-300',
    'border-servicessocietaux-300',
    'fill-servicessocietaux-300',
    'bg-servicessocietaux-300',
    'text-servicessocietaux-400',
    'border-servicessocietaux-400',
    'fill-servicessocietaux-400',
    'bg-servicessocietaux-400',
    'text-servicessocietaux-500',
    'border-servicessocietaux-500',
    'fill-servicessocietaux-500',
    'bg-servicessocietaux-500',
    'text-servicessocietaux-600',
    'border-servicessocietaux-600',
    'fill-servicessocietaux-600',
    'bg-servicessocietaux-600',
    'text-servicessocietaux-700',
    'border-servicessocietaux-700',
    'fill-servicessocietaux-700',
    'bg-servicessocietaux-700',
    'text-servicessocietaux-800',
    'border-servicessocietaux-800',
    'fill-servicessocietaux-800',
    'bg-servicessocietaux-800',
    'text-servicessocietaux-900',
    'border-servicessocietaux-900',
    'fill-servicessocietaux-900',
    'bg-servicessocietaux-900',
    'text-servicessocietaux-950',
    'border-servicessocietaux-950',
    'fill-servicessocietaux-950',
    'bg-servicessocietaux-950',
  ],
  plugins: [],
}
