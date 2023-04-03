module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#ff4d4f",
      },
      gridTemplateColumns: {
        // home: "1fr 3fr",
        home: "2fr 5fr",
        chat: "5fr 2fr",
      },
      gridTemplateRows: {
        sidebar: "1fr 1.5fr 10fr",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
