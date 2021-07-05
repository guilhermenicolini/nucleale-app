const custom = require('../webpack.config')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const merged = {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      }
    }
    return merged
  }
}