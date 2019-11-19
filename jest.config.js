const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');
module.exports = {
    ...jestConfig,
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/test/specs/',
        '<rootDir>/lcc-react-js-bike-model/'
    ]
};
