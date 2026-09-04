/** @type {import('tailwindcss').Config} */
import sharedConfig from "@jqbtx/ui/tailwind.config.js";

export default {
  // On garde le preset global
  presets: [sharedConfig],
  // On force Tailwind de l'app à scruter les fichiers du package UI
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
}