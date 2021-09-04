import { FC } from 'react'
import * as S from './Field.styles'

export type FieldProps = {
  label?: string
  name: string
  type?: 'text' | 'select' | 'email' | 'password'
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
    <S.Wrapper>
      {props.label ? <S.Label htmlFor={props.name} className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : ''}</S.Label> : ''}
      {props.icon}
      <S.Field
        id={props.name}
        as={props.type === 'select' ? 'select' : null}
        type={props.type === 'select' ? null : props.type}
        placeholder={props.placeholder}
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled} />
      <S.Span>{props.error}</S.Span>
    </S.Wrapper>
  )
}
