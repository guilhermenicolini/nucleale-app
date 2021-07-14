import styled from 'styled-components'

export const ModalContent = styled.div`
  ${(props) => props.theme.typography.body2};
  color: ${(props) => props.theme.colors.dark.mediumEmphasis};
`
