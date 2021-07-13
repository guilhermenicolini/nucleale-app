import { FC } from 'react'
import { BaseFieldWrapper, BaseFieldLabel, BaseField, BaseFieldSpan } from '@/presentation/components/base'

export interface InputProps {
  label?: string
  required?: boolean
  placeholder?: string
  value?: string
  touched?: boolean
  error?: string
  disabled?: boolean
}

const Input: FC<InputProps> = (props: InputProps) => {
  const isInvalid = props.touched && props.error?.length > 0
  return (
    <BaseFieldWrapper hasLabel={props.label?.length > 0}>
      {props.label ? <BaseFieldLabel className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : '' }</BaseFieldLabel> : ''}
      <BaseField
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled} />
      <BaseFieldSpan>{props.error}</BaseFieldSpan>
    </BaseFieldWrapper>
  )
}
export default Input
