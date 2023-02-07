/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#004FFF',
        'warning': '#FF1700',
        'available': '#D6DCB1',
        'sucess': '#22AF5F',
        'progress': '#B2AEEF',
        'btn-class-confirmed': '#707070'       
      }
    },
  },
  plugins: [],
}
