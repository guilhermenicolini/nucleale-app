import { FC } from 'react'
import { BaseFieldWrapper, BaseFieldLabel, BaseField, BaseFieldSpan } from '@/presentation/components/base'

export interface SelectProps {
  label?: string
  required?: boolean
  placeholder?: string
  items?: any[]
  value?: string
  touched?: boolean
  error?: string
  disabled?: boolean
}

const Select: FC<SelectProps> = (props: SelectProps) => {
  const isInvalid = props.touched && props.error?.length > 0
  return (
    <BaseFieldWrapper>
      <BaseFieldLabel className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : '' }</BaseFieldLabel>
      <BaseField
        as="select"
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled}>
          {props.placeholder ? <option value="">{props.placeholder}</option> : null}
          {props.items?.map(item => <option key={item.value} value={item.value} selected={item.value === props.value} >{item.label}</option>)}
        </BaseField>
      <BaseFieldSpan>{props.error}</BaseFieldSpan>
    </BaseFieldWrapper>
  )
}
export default Select
