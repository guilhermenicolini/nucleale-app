import { lighten } from '@/presentation/styles/utils'
import styled from 'styled-components'

export const BaseField = styled.input`
  min-width: 230px;
  height: 30px;
  border-radius: ${(props) => props.theme.general.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.palette.form};
  padding-left: 3px;
  margin-bottom: 2px;
  transition: background-color .2s,color .2s,border-color .2s,box-shadow .2s;
  color: ${(props) => props.theme.colors.dark.highEmphasis};

  ::placeholder:enabled {
    color: ${(props) => props.theme.colors.palette.placeHolder};
  }
  ::placeholder:disabled {
    color: ${(props) => props.theme.colors.dark.disabled};
  }
  &:enabled.invalid {
    border-color: ${(props) => props.theme.colors.palette.danger};
  }
  &:enabled:hover:not(.invalid) {
    border-color: ${(props) => props.theme.colors.palette.primary};
  }
  &:enabled:focus {
    box-shadow: 0 0 0 0.15rem ${(props) => lighten(props.theme.colors.palette.primary, 50)};
    outline: 0 none;
    outline-offset: 0;
    border-color: ${(props) => props.theme.colors.palette.primary};
  }
  &.invalid:enabled:focus {
    box-shadow: 0 0 0 0.15rem ${(props) => lighten(props.theme.colors.palette.danger, 90)};
    outline: 0 none;
    outline-offset: 0;
    border-color: ${(props) => props.theme.colors.palette.danger};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    border-color: ${(props) => props.theme.colors.dark.disabled};
    color: ${(props) => props.theme.colors.dark.disabled};
  }
`
