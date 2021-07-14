import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.modal};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.dark.disabled};
  display: flex;
  justify-content: center;
  align-items: center;
`
