import { Spinner, SpinnerProps } from './Spinner'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Spinner',
  component: Spinner
}

export default meta

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {
  isLoading: true
}
