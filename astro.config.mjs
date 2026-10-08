// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Chakra Petch",
      cssVariable: "--font-chakra-petch",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/chakra-petch/chakra-petch-semibold.ttf"],
            weight: "600",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/chakra-petch/chakra-petch-bold.ttf"],
            weight: "700",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/jetbrains-mono/jetbrains-mono-variable.ttf"],
            weight: "100 800",
            style: "normal",
          },
        ],
      },
    },
  ],
});
