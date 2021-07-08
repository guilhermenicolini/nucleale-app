import styled from 'styled-components'
import { FC } from 'react'
import { lighten } from '@/presentation/styles/utils'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  error?: string
}

const Wrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  ${(props) => props.theme.typography.subtitle1}
  color: ${(props) => props.theme.colors.dark.highEmphasis}
`

const InputText = styled.input.attrs(() => ({
  type: 'text'
}))`
  min-width: 230px;
  height: 30px;
  border-radius: ${(props) => props.theme.general.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.palette.form};
  padding-left: 3px;
  margin-bottom: 2px;

  ::placeholder {
    color: ${(props) => props.theme.colors.palette.placeHolder};
  }
  &:hover {
    border-color: ${(props) => props.theme.colors.palette.primary};
  }
  &:enabled:focus {
    box-shadow: 0 0 0 0.2rem ${(props) => lighten(props.theme.colors.palette.primary, 50)};
    outline: 0 none;
    outline-offset: 0;
    border-color: ${(props) => props.theme.colors.palette.primary};
  }
`

const Span = styled.span`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.palette.danger};
  min-width: 13px;
`

const Input: FC<InputProps> = ({ label, placeholder, value, error }: InputProps) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputText placeholder={placeholder} value={value} />
      <Span>{error}</Span>
    </Wrapper>
  )
}
export default Input
