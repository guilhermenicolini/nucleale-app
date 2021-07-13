import { contrast, darken } from '@/presentation/styles/utils'
import styled from 'styled-components'

export const AlertWrapper = styled.div<any>`
  z-index: ${(props) => props.theme.zIndex.alert};
  padding: 0 10px;
  background-color: ${(props) => props.theme.colors.palette[props.color].color};
  color: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
  box-shadow: ${(props) => props.theme.general.boxShadow};
  display: flex;
  align-items: center;

  & svg {
    width: 25px;
    min-width: 25px;
    & path {
      fill: ${(props) => darken(props.theme.colors.palette[props.color].color, props.theme.colors.palette[props.color].darken)};
    }
  }
`
