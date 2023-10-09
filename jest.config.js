/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ['**/tests/**/*.test.ts'], // Include TypeScript test files
};
