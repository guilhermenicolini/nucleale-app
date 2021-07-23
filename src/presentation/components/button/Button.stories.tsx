import { Button, ButtonProps } from './Button'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Button',
  component: Button
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Label</Button>

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  disabled: false,
  block: false
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  variant: 'secondary'
}

export const Danger = Template.bind({})
Danger.args = {
  ...Primary.args,
  variant: 'danger'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Primary.args,
  variant: 'warning'
}

export const Success = Template.bind({})
Success.args = {
  ...Primary.args,
  variant: 'success'
}

export const Info = Template.bind({})
Info.args = {
  ...Primary.args,
  variant: 'info'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Primary.args,
  disabled: true
}

export const Block = Template.bind({})
Block.args = {
  ...Primary.args,
  block: true
}
