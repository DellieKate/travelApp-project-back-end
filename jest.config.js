/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  testSequencer: "./testSequencer.js",
  verbose: true,
  transform: {
    "^.+\\.js$": "babel-jest",     //Transform JS files with Babel
  },
  setupFilesAfterEnv: ["src/tests/setup.js"],
  reporters: [
    "default",
    [
      "jest-junit", 
      { 
        outputDirectory: "coverage", 
        outputName: "junit.xml" 
      }
    ],
  ],
  moduleFileExtensions: ["js", "json", "node"],
  coverageDirectory: "coverage",
};

