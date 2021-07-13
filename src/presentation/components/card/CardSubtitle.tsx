import styled from 'styled-components'

export const CardSubtitle = styled.div`
  ${(props) => props.theme.typography.overline};
  color: ${(props) => props.theme.colors.dark.highEmphasis};
  margin-bottom: 5px;
`
