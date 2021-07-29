const custom = require('../webpack.dev')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const merged = {
      ...config,
      cache: false,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...custom.resolve.alias
        }
      }
    }
    return merged
  }
}