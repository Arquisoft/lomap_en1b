module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: [
        'build/src/**/*.js',
        'build/!src/**/*.test.js',
        'build/!src/index.js',
    ],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'text-summary',
    ],
};