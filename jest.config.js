/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\js$": "babel-jest"
  },
};

module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './src/tests',
        outputName: 'junit-testresults.xml',
      },
    ],
  ],
};