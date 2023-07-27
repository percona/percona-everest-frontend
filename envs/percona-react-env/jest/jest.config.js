// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

const reactJestConfig = require('@teambit/react/jest/jest.config');
// uncomment the line below and install the package if you want to use this function
// const {
//   generateNodeModulesPattern,
// } = require('@teambit/dependencies.modules.packages-excluder');
// const packagesToExclude = [];

module.exports = {
  ...reactJestConfig,
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
  testPathIgnorePatterns: ['.*\.e2e\.(js|ts)x?']
  // transformIgnorePatterns: [
  //   '^.+\.module\.(css|sass|scss)$',
  //   // generateNodeModulesPattern({ packages: packagesToExclude }),
  // ],
};
