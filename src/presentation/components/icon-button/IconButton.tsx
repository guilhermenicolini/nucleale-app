import styled from 'styled-components'
import { FC } from 'react'
import { darken } from '@/presentation/styles/utils'

const getColor = (svg: string, color: string): string => {
  console.log(svg, color)
  if (!svg || !color) return null
  return `${svg}: ${color}`
}

export interface IconButtonProps {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  svg?: 'fill' | 'stroke'
  children?: any
  disabled?: boolean
}

const StyledIconButton = styled.button<any>`
  height: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  

  & svg {
    height: 20px !important;
    & path {
      transition: fill .2s, stroke .2s;
      ${(props) => getColor(props.svg, props.theme.colors.palette[props.color]?.color)};
    }
  }
  &:hover:not(:disabled) svg path {
    ${(props) => getColor(props.svg, darken(props.theme.colors.palette[props.color]?.color, props.theme.colors.palette[props.color]?.darken))};
  }
  &:focus:not(:disabled) {
    outline: 0 none;
    outline-offset: 0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <StyledIconButton disabled={props.disabled} color={props.color} svg={props.svg}>
      {props.children}
    </StyledIconButton>
  )
}
export default IconButton
