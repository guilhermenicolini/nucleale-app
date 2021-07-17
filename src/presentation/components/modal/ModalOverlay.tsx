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
  transition: all .3s ease-in-out;

  & > div {
    transition: all .2s ease-in;
  }

  &.fade-enter {
    opacity: 0;
    & > div {
      transform: scale(0.1);
    }
  }

  &.fade-enter-active {
    opacity: 1;
    & > div {
      transform: scale(1);
    }
  }

  &.fade-exit {
    opacity: 1;
    & > div {
      transform: scale(1);
    }
  }

  &.fade-exit-active {
    opacity: 0;
    & > div {
      transform: scale(0.1);
    }
  }
`
