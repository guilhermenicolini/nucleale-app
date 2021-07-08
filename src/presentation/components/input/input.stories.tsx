import Input from './input'
import { ComponentStory, ComponentMeta } from '@storybook/react'

const Meta: ComponentMeta<typeof Input> = {
  title: 'Input'
}

export default Meta

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  value: '',
  error: ''
}
