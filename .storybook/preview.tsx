import React from 'react';
import App from '../src/main/config/App'

export const decorators = [
  (Story) => (
    <App>
      <Story />
    </App>
  )
]