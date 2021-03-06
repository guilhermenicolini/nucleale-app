import { Card, CardProps } from './Card'
import { IconButton } from '../icon-button/IconButton'
import { Story, Meta } from '@storybook/react'
import { DownloadIcon, DeleteIcon } from '../icons'

const meta: Meta = {
  title: 'Components/Card',
  component: Card
}

export default meta

const Template: Story<CardProps> = (args) =>
  <Card {...args}>
    <IconButton variant={args.variant}>
      <DownloadIcon />
    </IconButton>
    <IconButton variant="danger">
      <DeleteIcon />
    </IconButton>
  </Card>

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  subtitle: 'subtitle',
  content: 'Some content'
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  variant: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Default.args,
  variant: 'secondary'
}

export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  variant: 'danger'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  variant: 'warning'
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  variant: 'success'
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  variant: 'info'
}
