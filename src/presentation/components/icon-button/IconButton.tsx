import styled from 'styled-components'
import React, { FC } from 'react'

export interface IconButtonProps {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  children?: any
  disabled?: boolean
}

const StyledIconButton = styled.button`
  height: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & svg {
    height: 20px !important;
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
    <StyledIconButton disabled={props.disabled} color={props.color}>
      {props.children}
    </StyledIconButton>
  )
}
export default IconButton
