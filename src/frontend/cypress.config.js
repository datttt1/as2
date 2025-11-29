import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false, // tắt support file
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

  },
});
