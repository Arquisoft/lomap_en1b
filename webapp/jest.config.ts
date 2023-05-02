export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/**/*.test.js',
        '!src/index.js',
    ],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'text-summary',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!react-leaflet)/',
    ],
};