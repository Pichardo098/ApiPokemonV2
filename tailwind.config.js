/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bkg_white: "#E5E5E5",
        red_header: "#DD1A1A",
        black_header: "#0C0C0C",
        btn_red: "#D93F3F",
        btn_hover: "#ED8F8F",
        txt_red: "#FE1936",
        txt_black: "#333333",
      }
    },
  },
  plugins: [],
}

