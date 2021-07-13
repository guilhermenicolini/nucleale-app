import Select, { SelectProps } from './Select'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Select',
  component: Select
}

export default meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Select Label',
  required: false,
  placeholder: 'Select an item',
  items: [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' }
  ],
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
