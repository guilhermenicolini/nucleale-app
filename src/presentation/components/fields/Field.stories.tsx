import { Field, FieldProps } from './Field'
import { Story, Meta } from '@storybook/react'
import { SearchIcon } from '../icons'

const meta: Meta = {
  title: 'Components/Field',
  component: Field
}

export default meta

const Template: Story<FieldProps> = (args) => <Field {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Input Label',
  placeholder: 'Default',
  value: '',
  touched: false,
  error: '',
  disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}

export const Invalid = Template.bind({})
Invalid.args = {
  ...Default.args,
  touched: true,
  error: 'Invalid field'
}

export const Icon = Template.bind({})
Icon.args = {
  ...Default.args,
  icon: <SearchIcon />
}
