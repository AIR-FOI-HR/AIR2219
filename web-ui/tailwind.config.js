/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryBlue: 'rgba(0,109,170,1)',
        primaryOrange: 'rgba(255,125,0,1)',
        white: 'rgba(255,255,255,1)',
        black: 'rgba(0,0,0,1)',
        successGreen:'rgba(0,100,40,1)',
        failureRed:'rgba(173,0,0,1)',
        transparentGray: 'rgba(0,0,0,0.5)',
        borderGrey: "rgba(189,189,189,1)"
      },
      fontFamily:{
        openSans:['Open Sans','cursive'],
      }

    },
  },
  plugins: [],
}
