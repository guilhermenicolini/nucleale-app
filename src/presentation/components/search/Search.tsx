import { FC } from 'react'
import { BaseFieldWrapper, BaseField } from '@/presentation/components/base'
import { SearchIcon } from '@/presentation/components/icons'

export interface SearchProps {
  placeholder?: string
  value?: string
}

const Search: FC<SearchProps> = (props: SearchProps) => {
  return (
    <BaseFieldWrapper>
      <SearchIcon />
      <BaseField
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.value} />
    </BaseFieldWrapper>
  )
}
export default Search
