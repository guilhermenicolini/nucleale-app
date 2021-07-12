import { lighten, contrast, darken } from '@/presentation/styles/utils'
import styled from 'styled-components'
import { FC } from 'react'

export interface FabProps {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  children?: any
  disabled?: boolean
}

const StyledFab = styled.button`
  ${(props) => props.theme.typography.button}
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: ${(props) => props.theme.zIndex.fab};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  transition: background-color .2s,box-shadow .2s;
  background-color: ${(props) => props.theme.colors.palette[props.color].color};
  color: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
  cursor: pointer;

  & svg {
    width: 23px;
    & path {
      fill: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
    }
  }

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

const Fab: FC<FabProps> = (props: FabProps) => {
  return (
    <StyledFab disabled={props.disabled} color={props.color}>{props.children}</StyledFab>
  )
}
export default Fab
