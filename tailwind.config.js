/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "homeImgae":"url(@/assets/image/bgimg.jpg)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
