/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#28194B", // এখানে আপনার পছন্দের কালার সেট করুন
      },
      fontFamily: {
        jaldi: ["Jaldi", "sans-serif"],
        jaro: ["Jaro", "cursive"],
      },
    },
  },
  plugins: [],
}

