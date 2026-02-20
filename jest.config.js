/** @type {import('jest').Config} */
export default {
  verbose: true,
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
      { 
        outputDirectory: "coverage", 
        outputName: "junit.xml" 
      }
    ],
  ],
  moduleFileExtensions: ["js", "json", "node"],
  coverageDirectory: "coverage",
};

