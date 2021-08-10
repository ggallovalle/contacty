const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  testPathIgnorePatterns: ['/node_modules/', '.e2e.spec.ts'],
};
