import styled, { Theme } from 'styled-components'
import { FC } from 'react'
import { BaseInput } from '@/presentation/components/base'

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

const Wrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  ${(props) => props.theme.typography.subtitle1}
  color: ${(props) => props.theme.colors.dark.highEmphasis};
  &.invalid {
    color: ${(props) => props.theme.colors.palette.danger};
  }
`

const Span = styled.span<InputProps>`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.palette.danger};
  min-height: 13px;
`

const Input: FC<InputProps> = (props: InputProps) => {
  const isInvalid = props.touched && props.error?.length > 0
  return (
    <Wrapper>
      <Label className={isInvalid ? 'invalid' : ''}>{props.label}{props.required ? ' *' : '' }</Label>
      <BaseInput
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.value}
        className={isInvalid ? 'invalid' : ''}
        disabled={props.disabled} />
      <Span>{props.error}</Span>
    </Wrapper>
  )
}
export default Input
