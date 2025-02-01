import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        'gray-900': '#111827',
        'purple-900': '#581c87',
        'transparent-gray': 'rgba(17, 24, 39, 0)',
        'transparent-purple': 'rgba(88, 28, 135, 0)',
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(to bottom right, #111827, rgba(88, 28, 135, 0) 0%, #581c87 50%, rgba(17, 24, 39, 0) 100%)',
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
