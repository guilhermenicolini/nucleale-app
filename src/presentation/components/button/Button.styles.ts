import styled, { css } from 'styled-components'
import { contrast, darken, lighten } from '@/presentation/styles/utils'
import { ButtonProps } from './Button'

type StyledProps = Pick<ButtonProps, 'variant' | 'block'>

export const Button = styled.button<StyledProps>`
  ${({ theme, variant = 'primary', block = false }) => css`
    ${theme.typography.button}
    text-transform: capitalize;
    height: 40px;
    border-radius: ${theme.general.borderRadius};
    border: none;
    transition: background-color .2s,box-shadow .2s;
    cursor: pointer;
    padding: 0 10px;
    ${block ? 'min-width: 230px;' : ''}
    ${block ? 'width: 100%;' : ''}
    background-color: ${theme.colors.palette[variant].color};
    color: ${contrast(theme.colors.palette[variant].color)};
    margin-bottom: 8px;

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
