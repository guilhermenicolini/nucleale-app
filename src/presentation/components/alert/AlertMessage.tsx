import { contrast } from '@/presentation/styles/utils'
import styled from 'styled-components'

export const AlertMessage = styled.div`
  ${(props) => props.theme.typography.body2};
  padding: 10px;
  color: ${(props) => contrast(props.theme.colors.palette[props.color].color)};
`
