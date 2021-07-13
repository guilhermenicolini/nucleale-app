import Fab, { FabProps } from './Fab'
import { Story, Meta } from '@storybook/react'
import { AddIcon } from '@/presentation/components/icons'

const meta: Meta = {
  title: 'Components/Fab',
  component: Fab
}

export default meta

const Template: Story<FabProps> = (args) => <Fab {...args}><AddIcon /></Fab>

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