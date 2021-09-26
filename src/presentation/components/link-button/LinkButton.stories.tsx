import { LinkButton, LinkButtonProps } from './LinkButton'
import { Story, Meta } from '@storybook/react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

const meta: Meta = {
  title: 'Components/LinkButton',
  component: LinkButton
}

export default meta
const history = createMemoryHistory({ initialEntries: ['/'] })
const Template: Story<LinkButtonProps> = (args) => <Router history={history}><LinkButton {...args}>Label</LinkButton></Router>

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  disabled: false,
  block: false,
  type: 'button',
  to: ''
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
