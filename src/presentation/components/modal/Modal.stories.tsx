import Modal, { ModalProps } from './Modal'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal
}

export default meta

const Template: Story<ModalProps> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Modal title',
  content: 'Modal content',
  show: true
}
