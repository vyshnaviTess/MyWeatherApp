module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
  moduleNameMapper: {
    'react-native-gesture-handler':
      '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Adjust the glob pattern as necessary to include all relevant files
    '!src/**/*.d.ts', // Exclude type definition files
    '!src/**/index.ts', // Exclude index files if you have them
    '!**/node_modules/**', // Exclude node_modules
  ],
  coverageReporters: ['text', 'lcov'], // Report formats
  coverageThreshold: {
    global: {
      branches: 80, // Set coverage thresholds
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
