/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f0f12',
          raised: '#15151a',
        },
      },
    },
  },
  plugins: [],
};
