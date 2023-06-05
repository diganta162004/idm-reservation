module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/node_modules/util-deprecate'],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|query-string)',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest',
    // '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(css|scss)$': '<rootDir>/__test__/styleMock.js',
  },
  globals: {
    USE_MOCK_DATA: true,
  },
};
