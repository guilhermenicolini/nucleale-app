import IconButton, { IconButtonProps } from './IconButton'
import { Story, Meta } from '@storybook/react'
import { AddIcon } from '@/presentation/components/icons'

const meta: Meta = {
  title: 'Components/IconButton',
  component: IconButton
}

export default meta

const Template: Story<IconButtonProps> = (args) => <IconButton {...args}><AddIcon /></IconButton>

export const Primary = Template.bind({})
Primary.args = {
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

export const Disabled = Template.bind({})
Disabled.args = {
  ...Primary.args,
  disabled: true
}
