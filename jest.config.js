module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts'
  ],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  watchPathIgnorePatterns: ['index']
}
