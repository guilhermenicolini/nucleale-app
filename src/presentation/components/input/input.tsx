import { Theme } from 'styled-components'
import { FC } from 'react'
import { BaseInputWrapper, BaseInputLabel, BaseInput, BaseInputSpan } from '@/presentation/components/base'

export interface InputProps {
  theme: Theme
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
    <BaseInputWrapper>
      <BaseInputLabel className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : '' }</BaseInputLabel>
      <BaseInput
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled} />
      <BaseInputSpan>{props.error}</BaseInputSpan>
    </BaseInputWrapper>
  )
}
export default Input
