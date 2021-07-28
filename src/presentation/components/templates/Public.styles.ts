import styled, { css } from 'styled-components'

export const Content = styled.div`
  ${({ theme }) => css`
    height: 100vh;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      display: grid;
      grid-template-columns: 50% 50%;
    }
  `}
`

export const ColumnHeader = styled.div`
  ${({ theme }) => css`
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      background: ${theme.colors.palette.primary.color};
    }
  `}
`

export const ColumnContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 90px;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      margin-top: 0;
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.palette.primary.color};
    position: relative;
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      flex-direction: column-reverse;
      background: none;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `}
`

export const Brand = styled.div`
  ${({ theme }) => css`
    padding: 10px;
    margin-bottom: 70px;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      margin-bottom: 0;
    }
  `}
`

export const Logo = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    top: 70px;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      position: inherit;
      width: inherit;
      top: 0;
    }
  `}
`

export const Slogan = styled.div`
  ${({ theme }) => css`
    display: none;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      display: block;
    }
  `}
`

// export const Content = styled.div`
//   ${({ theme }) => css`

//   `}
// `
