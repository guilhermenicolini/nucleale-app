import { ForwardRefRenderFunction, forwardRef } from 'react'
import * as S from '@/presentation/components/field/Field.styles'

export interface SelectProps {
  label?: string
  name: string
  required?: boolean
  placeholder?: string
  items?: any[]
  value?: string
  touched?: boolean
  error?: string
  disabled?: boolean
}

const SelectBase: ForwardRefRenderFunction<any, SelectProps> = (
  {
    label,
    name,
    required,
    placeholder,
    items,
    value,
    touched,
    error,
    disabled,
    ...rest
  }: SelectProps,
  ref) => {
  const isInvalid = touched && error?.length > 0
  return (
    <S.Wrapper>
      {label ? <S.Label htmlFor={name} className={isInvalid ? 'invalid' : ''}>{label}{required ? ' *' : ''}</S.Label> : ''}
      <S.Field
        as="select"
        id={name}
        name={name}
        defaultValue={value}
        className={isInvalid ? 'invalid' : ''}
        disabled={disabled}
        ref={ref}
        {...rest} >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {items?.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </S.Field>
      <S.Span role={`${name}-alert`}>{error}</S.Span>
    </S.Wrapper>
  )
}

export const Select = forwardRef(SelectBase)
