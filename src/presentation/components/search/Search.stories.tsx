import Search, { SearchProps } from './Search'
import { Story, Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Search',
  component: Search
}

export default meta

const Template: Story<SearchProps> = (args) => <Search {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Default',
  value: ''
}
