import styled from 'styled-components'

export const CardTitle = styled.div`
  ${(props) => props.theme.typography.headline6};
  color: ${(props) => props.theme.colors.dark.highEmphasis};
`
