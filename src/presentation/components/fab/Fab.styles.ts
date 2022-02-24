import styled, { css } from 'styled-components'
import { FabProps } from './Fab'
import { lighten, contrast, darken } from '@/presentation/styles/utils'

type StyleProps = Pick<FabProps, 'variant'>

export const Button = styled.button<StyleProps>`
  ${({ theme, variant = 'primary' }) => css`
    ${theme.typography.button}
    position: absolute;
    bottom: 15px;
    right: 15px;
    z-index: ${theme.zIndex.fab};
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    transition: background-color .2s,box-shadow .2s;
    background-color: ${theme.colors.palette[variant].color};
    color: ${contrast(theme.colors.palette[variant].color)};
    cursor: pointer;

    @media only screen and (max-width: ${theme.breakPoint.tablet}px) {
      bottom: 85px;
    }

    & svg {
      width: 23px;
      & path {
        fill: ${contrast(theme.colors.palette[variant].color)};
      }
    }

    &:hover:not(:disabled) {
      background-color: ${darken(theme.colors.palette[variant].color, theme.colors.palette[variant].darken)};
    }
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette[variant].color, theme.colors.palette[variant].lighten)};
      outline: 0 none;
      outline-offset: 0;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`
