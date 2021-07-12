import { contrast, lighten, darken } from '@/presentation/styles/utils'
import styled from 'styled-components'
import { FC } from 'react'

export interface LinkButtonProps {
  label: string
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  disabled?: boolean
}

const StyledLinkButton = styled.button`
  ${(props) => props.theme.typography.button}
  text-transform: capitalize;
  min-width: 230px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: ${(props) => props.theme.general.borderRadius};
  transition: background-color .2s,box-shadow .2s,color .2s;
  background-color: transparent;
  color: ${(props) => props.theme.colors.palette[props.color].color};
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${(props) => darken(props.theme.colors.palette[props.color].color, props.theme.colors.palette[props.color].darken)};
    color: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
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

const LinkButton: FC<LinkButtonProps> = (props: LinkButtonProps) => {
  return (
    <StyledLinkButton disabled={props.disabled} color={props.color} >{props.label}</StyledLinkButton>
  )
}
export default LinkButton
