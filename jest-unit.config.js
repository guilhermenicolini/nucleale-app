process.env.DEBUG_PRINT_LIMIT = 100000
const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts', '**/*.spec.tsx']
module.exports = config
