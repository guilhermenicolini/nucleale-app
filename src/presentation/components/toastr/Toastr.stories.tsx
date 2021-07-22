import Button from '../button/Button'
import { Story, Meta } from '@storybook/react'
import { toast } from 'react-toastify'

const meta: Meta = {
  title: 'Components/Toastr'
}

interface ToastrProps {
  variant: 'info' | 'success' | 'warning' | 'danger'
}

const clicks = {
  info: () => {
    toast.info('Message')
  },
  success: () => {
    toast.success('Message')
  },
  warning: () => {
    toast.warning('Message')
  },
  danger: () => {
    toast.error('Message')
  }
}

export default meta

const Template: Story<ToastrProps> = (args) => <Button label="Show" onClick={clicks[args.variant]} />

export const Default = Template.bind({})
Default.args = {
  variant: 'info'
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  variant: 'success'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  variant: 'warning'
}

export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  variant: 'danger'
}
