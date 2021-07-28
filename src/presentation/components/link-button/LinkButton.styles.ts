import styled, { css } from 'styled-components'
import { LinkButtonProps } from './LinkButton'
import { contrast, lighten, darken } from '@/presentation/styles/utils'

type StyledProps = Pick<LinkButtonProps, 'variant'>

export const LinkButton = styled.button<StyledProps>`
  ${({ theme, variant = 'primary' }) => css`
    ${theme.typography.button};
    text-transform: capitalize;
    min-width: 230px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: ${theme.general.borderRadius};
    transition: background-color .2s,box-shadow .2s,color .2s;
    background-color: transparent;
    color: ${theme.colors.palette[variant].color};
    cursor: pointer;

    &:hover:not(:disabled) {
    background-color: ${darken(theme.colors.palette[variant].color, theme.colors.palette[variant].darken)};
    color: ${contrast(theme.colors.palette[variant].color)};
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
