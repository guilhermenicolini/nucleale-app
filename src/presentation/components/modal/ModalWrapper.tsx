import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: relative;
  z-index: ${(props) => parseInt(props.theme.zIndex.modal) + 1};
  background-color: ${(props) => props.theme.colors.light.highEmphasis};
  box-shadow: ${(props) => props.theme.general.boxShadow};
  border-radius: ${(props) => props.theme.general.borderRadius};
  margin: 10px;
  padding: 10px;
  width: 310px;
`
