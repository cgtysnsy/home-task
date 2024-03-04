/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6875F5",
        secondary: "#FFEDD5",
        accent: "#F47174",
        dark: "#273444",
        light: "#F4F7FA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Assuming you want to use Inter font
      },
    },
  },
  classes: {
    table:
      "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border",
    thead: "",
    theadTr: "",
    theadTh: "px-3 py-2 font-semibold text-left bg-gray-100 border-b",
    tbody: "bg-white divide-y divide-gray-100",
    tr: "",
    td: "px-3 py-2 whitespace-no-wrap",
    tfoot: "",
    tfootTr: "",
    tfootTd: "",
  },
  variants: {
    thin: {
      td: "p-1 whitespace-no-wrap text-sm",
      theadTh: "p-1 font-semibold text-left bg-gray-100 border-b text-sm",
    },
  },
  plugins: [],
};
