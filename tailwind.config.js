import withMT from "@material-tailwind/react/utils/withMT"

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./src/app/(routes)/**/*.{js,ts,jsx,tsx}",
    "./src/lib/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
})
