import Card, { CardProps } from './Card'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Card',
  component: Card
}

export default meta

const Template: Story<CardProps> = (args) => <Card {...args}><div>#1</div><div>#2</div></Card>

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  subtitle: 'subtitle',
  content: 'Some content'
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  color: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Default.args,
  color: 'secondary'
}

export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  color: 'danger'
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  color: 'warning'
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  color: 'success'
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  color: 'info'
}
