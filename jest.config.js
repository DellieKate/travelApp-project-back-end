/** @type {import('jest').Config} */
export default {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\js$": "babel-jest",     //Transform JS files with Babel
  testSequencer: ".testSequencer.js"
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

