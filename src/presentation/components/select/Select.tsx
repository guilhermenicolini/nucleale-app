import { FC } from 'react'
import * as S from '@/presentation/components/field/Field.styles'

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

export const Select: FC<SelectProps> = (props: SelectProps) => {
  const isInvalid = props.touched && props.error?.length > 0
  return (
    <S.Wrapper>
      <S.Label className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : ''}</S.Label>
      <S.Field
        as="select"
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled}>
        {props.placeholder ? <option value="">{props.placeholder}</option> : null}
        {props.items?.map(item => <option key={item.value} value={item.value} selected={item.value === props.value} >{item.label}</option>)}
      </S.Field>
      <S.Span>{props.error}</S.Span>
    </S.Wrapper>
  )
}
