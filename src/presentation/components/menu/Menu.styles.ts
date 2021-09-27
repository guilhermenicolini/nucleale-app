import { darken, lighten } from '@/presentation/styles/utils'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { MenuProps } from './Menu'

type ReactLinkProps = Pick<MenuProps, 'mode'> & NavLinkProps
type OrientationProps = Pick<MenuProps, 'orientation'>

const setOrientation = {
  vertical: () => css`
    display: flex;
    width: 100%;
    justify-content: center;
  `,
  horizontal: ({ theme }) => css`
    display: none;
    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  `
}

export const Nav = styled.nav<OrientationProps>`
  ${({ orientation = 'horizontal' }) => css`
    ${setOrientation[orientation]};
  `}
`

const setMenuOrientation = {
  vertical: () => css`
    flex-direction: column;
  `,
  horizontal: () => css`
    max-width: 500px;
    justify-content: space-around;
  `
}

export const Menu = styled.ul<OrientationProps>`
  ${({ orientation = 'horizontal' }) => css`
    display: inline-flex;
    list-style-type: none;
    width: 100%;
    margin: 10px;
    ${setMenuOrientation[orientation]};
  `}
`

const setItemOrientation = {
  vertical: () => css`
    margin: 10px 0;
  `,
  horizontal: () => css``
}

export const Item = styled.li<OrientationProps>`
  ${({ orientation = 'horizontal' }) => css`
    ${setItemOrientation[orientation]};
  `}
`

const setMode = {
  light: ({ theme }) => css`
    color: ${theme.colors.light.mediumEmphasis};
    &:hover {
      color: ${darken(theme.colors.light.mediumEmphasis, 15)};
    }

    &.active {
      color: ${theme.colors.palette.secondary.color};
    }
  `,
  dark: ({ theme }) => css`
    color: ${theme.colors.dark.highEmphasis};
    &:hover {
      color: ${lighten(theme.colors.dark.highEmphasis, 40)};
    }
    &.active {
      color: ${theme.colors.palette.primary.color};
    }
  `
}

export const ReactLink = styled(NavLink)<ReactLinkProps>`
  ${({ theme, mode = 'light' }) => css`
    ${theme.typography.headline6}
    
    text-decoration: none;
    transition: color .2s;
    ${setMode[mode]};
  `}
`
