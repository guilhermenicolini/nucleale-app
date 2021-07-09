import styled from 'styled-components'

export const BaseFieldSpan = styled.span`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.palette.danger};
  min-height: 13px;
`
