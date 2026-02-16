import Sequencer from '@jest/test-sequencer';

class CustomSequencer extends Sequencer {
  sort(tests) {
    const cityTests = [];
    const otherTests = [];

    tests.forEach(test => {
      // Any test file containing "city" (case-insensitive) goes last
      if (/city/i.test(test.path)) {
        cityTests.push(test);
      } else {
        otherTests.push(test);
      }
    });

    // Run other tests first, city tests last
    return [...otherTests, ...cityTests];
  }
}

export default CustomSequencer;
