/** @type {import('jest').Config} */
const config = {
  // Define the environment Jest should run in (mimicking a browser environment for React)
  testEnvironment: 'jsdom',
  
  // Configure file transformation
  transform: {
    // Use babel-jest for all JS/JSX/TS/TSX files
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },

  // Files/folders to ignore during transformation (usually node_modules)
  // You might need to adjust this if dependencies use modern syntax
  transformIgnorePatterns: [
    '/node_modules/',
  ],

  // Module file extensions to consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Setup file for extending jest-axe matchers
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // We'll create this file next
};

module.exports = config;