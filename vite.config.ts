import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    build: {
      ssr: false, // Ensures client-side only build
    },
      base: isProduction ? '/LabelGeneratorRDL/' : '/', // Set base path for GitHub Pages
  };
});
