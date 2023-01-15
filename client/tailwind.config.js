const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'discord-gray': {
          100: '#f8f0fe',
          200: '#dcddde',
          300: '#b9bbbe',
          400: '#a3a6aa',
          700: '#36393f',
          900: '#202225',
        },
        'discord-purple': {
          500: '#5865f2',
        },
        'discord-blue': {
          400: '#00aff4',
        },
        'discord-red': {
          300: '#f38688',
          500: '#ed4245',
        },
      },
      fontFamily: {
        sans: ['var(--font-ggsans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
