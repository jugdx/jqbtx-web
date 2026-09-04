/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../../apps/web/index.html",
    "../../apps/web/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1b26',
        panel: '#24283b',
        border: '#292e42',
        text: '#c0caf5',
        muted: '#565f89',
        primary: '#bb9af7',
        success: '#9ece6a',
        danger: '#f7768e',
        warning: '#e0af68',
        info: '#7aa2f7'
      },
    },
  },
  plugins: [],
}