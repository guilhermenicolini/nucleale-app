import { ForwardRefRenderFunction, forwardRef } from 'react'
import InputMask from 'react-input-mask'
import * as S from './Field.styles'

export type FieldProps = {
  label?: string
  name: string
  type?: 'text' | 'select' | 'email' | 'password' | 'number' | 'date' | 'tel'
  required?: boolean
  placeholder?: string
  value?: string
  touched?: boolean
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  mask?: string
}

const FieldBase: ForwardRefRenderFunction<any, FieldProps> = (
  {
    label,
    touched,
    error,
    required,
    placeholder,
    name,
    icon,
    type,
    disabled,
    ...rest
  }: FieldProps,
  ref) => {
  const isInvalid = touched && error?.length > 0
  return (
    <S.Wrapper label={label}>
      {label ? <S.Label htmlFor={name} className={isInvalid ? 'invalid' : ''}>{label}{required ? ' *' : ''}</S.Label> : ''}
      {icon}
      <S.Field
        type={type === 'select' ? null : type}
        as={type === 'select' ? 'select' : null}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={isInvalid ? 'invalid' : ''}
        ref={ref}
        {...rest} />
      <S.Span role={`${name}-alert`}>{error}</S.Span>
    </S.Wrapper>
  )
}

export const Field = forwardRef(FieldBase)

const FieldMaskBase: ForwardRefRenderFunction<any, FieldProps> = (
  {
    value,
    mask,
    ...rest
  }: FieldProps,
  ref) => {
  return (
    <InputMask mask={mask} value={value} {...rest}>
      {(inputProps) => <Field {...inputProps} ref={ref} />}
    </InputMask>
  )
}

export const FieldMask = forwardRef(FieldMaskBase)
