import { lighten, contrast, darken } from '@/presentation/styles/utils'
import styled from 'styled-components'
import { FC } from 'react'

export interface ButtonProps {
  label: string
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  block?: boolean
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

const StyledButton = styled.button<any>`
  ${(props) => props.theme.typography.button}
  text-transform: capitalize;
  ${(props) => props.block ? 'min-width: 230px;' : ''};
  ${(props) => props.block ? 'width: 100%;' : ''};
  height: 40px;
  border-radius: ${(props) => props.theme.general.borderRadius};
  border: none;
  transition: background-color .2s,box-shadow .2s;
  background-color: ${(props) => props.theme.colors.palette[props.color].color};
  color: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
  cursor: pointer;
  padding: 0 10px;

  &:hover:not(:disabled) {
    background-color: ${(props) => darken(props.theme.colors.palette[props.color].color, props.theme.colors.palette[props.color].darken)};
  }
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 0.15rem ${(props) => lighten(props.theme.colors.palette[props.color].color, props.theme.colors.palette[props.color].lighten)};
    outline: 0 none;
    outline-offset: 0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <StyledButton
      disabled={props.disabled}
      color={props.color || 'primary'}
      block={props.block}
      onClick={props.onClick}>
      {props.label}
    </StyledButton>
  )
}
export default Button
