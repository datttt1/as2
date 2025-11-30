module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFiles: ["<rootDir>/setupJestEnv.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTestsAfterEnv.js"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "outputPath": "./reports/test-report.html",
      "pageTitle": "Test Report"
    }]
  ]
};
