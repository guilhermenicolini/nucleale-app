import Alert, { AlertProps } from './Alert'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Alert',
  component: Alert
}

export default meta

const Template: Story<AlertProps> = (args) => <Alert {...args} />

export const Danger = Template.bind({})
Danger.args = {
  color: 'danger',
  message: 'Alert message'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Danger.args,
  color: 'warning'
}

export const Success = Template.bind({})
Success.args = {
  ...Danger.args,
  color: 'success'
}

export const Info = Template.bind({})
Info.args = {
  ...Danger.args,
  color: 'info'
}
