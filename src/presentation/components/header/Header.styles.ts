import styled, { css } from 'styled-components'

export const Section = styled.section``

export const Header = styled.header`
    ${({ theme }) => css`
    height: 60px;
    background-color: ${theme.colors.palette.primary.color};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    & > svg {
      min-width: 140px;
      width: 140px;
    }

    & #logout {
      display: none;
      @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
        display: block;
      }
    }

    & #menu {
      @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
        display: none;
      }
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    margin: 10px;
  `}
`
