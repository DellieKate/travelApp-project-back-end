/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  testSequencer: "./testSequencer.js",
  verbose: true,
  transform: {
    "^.+\\.js$": "babel-jest",     //Transform JS files with Babel
    },
  reporters: [
    "default",
    [
      "jest-junit", 
      { outputDirectory: "coverage", outputName: "junit.xml" }
    ],
  ],
  moduleFileExtensions: ["js", "json", "node"],
  collectCoverage: true,
  coverageReporters: ["json-summary", "text", "html"],
  coverageDirectory: "coverage",
};

