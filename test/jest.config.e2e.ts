import { defineConfig } from 'jest';

const config = defineConfig({
  displayName: 'e2e',
  testMatch: ['**/*.{e2e-spec,e2e-test}.ts'],
  rootDir: './',
  testEnvironment: 'node',

  testTimeout: 30000,

  verbose: true,

  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },

  coverageDirectory: './coverage/e2e',
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
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/e2e/',
  ],
});

export default config;
