import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    supportFile: false, // tắt support file
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
});
