import styled from 'styled-components'

export const ModalTitle = styled.div`
  ${(props) => props.theme.typography.subtitle1};
  color: ${(props) => props.theme.colors.dark.highEmphasis};
`
