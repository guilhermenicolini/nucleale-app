import Button, { ButtonProps } from './Button'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Button',
  component: Button
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  color: 'primary',
  disabled: false
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  color: 'secondary'
}

export const Danger = Template.bind({})
Danger.args = {
  ...Primary.args,
  color: 'danger'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Primary.args,
  color: 'warning'
}

export const Success = Template.bind({})
Success.args = {
  ...Primary.args,
  color: 'success'
}

export const Info = Template.bind({})
Info.args = {
  ...Primary.args,
  color: 'info'
}

// const colors = ['Primary', 'Secondary', 'Danger', 'Warning', 'Success', 'Info']

export const Disabled = Template.bind({})
Disabled.args = {
  ...Primary.args,
  disabled: true
}
