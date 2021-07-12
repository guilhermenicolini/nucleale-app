import styled from 'styled-components'

export const BaseFieldSpan = styled.span`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.palette.danger.color};
  min-height: 13px;
`
