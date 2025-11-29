module.exports= {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFiles: ["<rootDir>/setupJestEnv.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTestsAfterEnv.js"],
   reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results",
        outputName: "junit.xml"
      }
    ]
  ]
};
