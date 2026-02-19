/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        accessible: ['OpenDyslexic', 'Arial', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
