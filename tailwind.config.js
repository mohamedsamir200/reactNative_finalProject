/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./App.{js,jsx,ts,tsx}",
  //   "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  // ],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Components//*.{js,jsx,ts,tsx}",
    "./Screens/OpeningScreen.jsx.{js,jsx,ts,tsx}",
  ],

  // content: ["./App.{js,jsx,ts,tsx}", "./Components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },
  plugins: [],
}

