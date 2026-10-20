// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Tech Conference 2026",
        short_name: "TechConf",
        description: "Schedule and speakers",
        theme_color: "#00151d",
        background_color: "#00151d",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2,ttf}"],
      },
    }),
    sanity({
      projectId: "7xq89tus",
      dataset: "production",
      apiVersion: "2026-10-20",
      useCdn: false, // for static builds
    }),
  ],

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

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
});
