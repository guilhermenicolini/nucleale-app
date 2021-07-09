import Input, { InputProps } from './input'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Input',
  component: Input
}

export default meta

const Template: Story<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'InputText',
  required: false,
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
  error: 'Campo inválido'
}
