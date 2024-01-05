/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx.,css}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-bg': '#252F3D',
      },
      color: {
        'dark-main':'#2C3642',
        'gray-250' :'#4D5C6F',
      },
      boxShadow: {
        '3xl': '0px 4px 30px 0px rgba(0, 0, 0, 0.08)',
        '4xl':' 0px 4px 20px 4px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}