import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator((story) => <div style={{ background: 'pink' }}>{story()}</div>);