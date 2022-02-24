import { darken } from '@/presentation/styles/utils'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { MenuProps } from './Menu'

type ReactLinkProps = Pick<MenuProps, 'mode'> & NavLinkProps

export const Nav = styled.nav`
  ${({ theme }) => css`
    @media only screen and (max-width: ${theme.breakPoint.tablet}px) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: ${theme.colors.palette.primary.color};
      height: 70px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`

export const Menu = styled.ul`
  ${({ theme }) => css`
    display: inline-flex;
    list-style-type: none;
    width: 100%;
    
    justify-content: space-around;
    margin: 10px 20px;
  `}
`

export const Item = styled.li`
  white-space: nowrap;
  margin: 0 5px;
`

export const ReactLink = styled(NavLink)<ReactLinkProps>`
  ${({ theme }) => css`
    ${theme.typography.headline6}
    
    text-decoration: none;
    transition: color .2s;
    color: ${theme.colors.light.mediumEmphasis};
    &:hover {
      color: ${darken(theme.colors.light.mediumEmphasis, 15)};
    }

    &.active {
      color: ${theme.colors.palette.secondary.color};
    }

    i {
      display: none;
    }

    @media only screen and (max-width: ${theme.breakPoint.tablet}px) {
      font-size: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & i {
        display: block;
        font-size: 24px;
      }
    }
  `}
`
