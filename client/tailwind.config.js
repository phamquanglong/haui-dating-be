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
        sidebar: "1.25fr 1.5fr 10fr",
        sidebarMd: "1.25fr 1.5fr 15fr",
      },

      keyframes: {
        drop: {
          "0%": { transform: "none" },
          "50%": { transform: "translateY(-80%)" },
          "100%": { transform: "none" },
        },
        miniDrop: {
          "0%": { transform: "none" },
          "50%": { transform: "translateY(-30%)" },
          "100%": { transform: "none" },
        },
      },
      animation: {
        "dot1-fall": "drop 1s ease-in-out 0.12s infinite",
        "dot2-fall": "drop 1s ease-in-out  0.24s infinite",
        "dot3-fall": "drop 1s ease-in-out  0.36s infinite",
        "arrow-down-fall": "miniDrop 1.5s ease-in-out 0.12s infinite",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
