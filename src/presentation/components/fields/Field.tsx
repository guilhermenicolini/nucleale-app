import { FC } from 'react'
import * as S from './Field.styles'

export type FieldProps = {
  label?: string
  type: 'text' | 'select'
  required?: boolean
  placeholder?: string
  value?: string
  touched?: boolean
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export const Field: FC<FieldProps> = (props: FieldProps) => {
  const isInvalid = props.touched && props.error?.length > 0
  return (
    <S.Wrapper label={props.label}>
      {props.label ? <S.Label className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : '' }</S.Label> : ''}
      {props.icon}
      <S.Field
        as={props.type}
        placeholder={props.placeholder}
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled} />
      <S.Span>{props.error}</S.Span>
    </S.Wrapper>
  )
}
