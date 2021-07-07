import React, { Fragment } from 'react';
import { Normalize } from '../src/presentation/styles/normalize'
import { GlobalStyle } from '../src/presentation/styles/global'

export const decorators = [
  (Story) => (
    <Fragment>
      <Normalize />
      <GlobalStyle />
      <Story />
    </Fragment>
  )
]