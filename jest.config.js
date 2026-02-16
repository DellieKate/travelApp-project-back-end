/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\js$": "babel-jest",     //Transform JS files with Babel
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

