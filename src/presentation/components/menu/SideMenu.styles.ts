import styled from 'styled-components'

export const Section = styled.section``

export const Menu = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  right: -100%;
  transition: right .3s ease-in-out;
  z-index: 1;

  &.opened {
    right: 0;
  }
`

export const Header = styled.div`
  padding: 0 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    width: 140px;
    & path {
      fill: black;
    }
  }
`

export const Content = styled.div`
  padding: 10px;
`
