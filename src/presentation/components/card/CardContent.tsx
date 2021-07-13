import styled from 'styled-components'

export const CardContent = styled.div`
  ${(props) => props.theme.typography.body2};
  color: ${(props) => props.theme.colors.dark.mediumEmphasis};
  margin-top: 5px;
`
