import { defineConfig } from 'jest';

const config = defineConfig({
  displayName: 'unit',
  testMatch: [
    '**/test/**/*.test.ts',
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts',
  ],
  rootDir: '../',
  testEnvironment: 'node',
  preset: 'ts-jest',
  maxWorkers: '50%',

  testTimeout: 10000,

  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['text', 'html', 'lcov', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.e2e-spec.ts',
    '!src/**/types/**',
    '!src/**/*.d.ts',
    '!src/**/*.module.ts',
    '!src/**/*.guard.ts',
    '!src/**/*.decorator.ts',
    '!src/main.ts',
    '!src/database/generated/*',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/test/e2e/',
    '<rootDir>/src/database/generated/',
  ],
});

export default config;
