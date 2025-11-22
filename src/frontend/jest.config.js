export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFiles: ["<rootDir>/setupJestEnv.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTestsAfterEnv.js"],
};
