import styled, { css, Theme } from 'styled-components'
import { Variants } from '@/presentation/styles/theme'
import { contrast, darken, lighten } from '@/presentation/styles/utils'

export type ButtonProps = {
  variant?: Variants
  block?: boolean
  disabled?: boolean
}

const buttonColorModifier = (variant: string, theme: Theme): any => css`
  background-color: ${theme.colors.palette[variant].color};
  color: ${contrast(theme.colors.palette.primary.color)};

  &:hover:not(:disabled) {
    background-color: ${darken(theme.colors.palette.primary.color, theme.colors.palette.primary.darken)};
  }
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette.primary.color, theme.colors.palette.primary.lighten)};
  }
`

export const Button = styled.button<ButtonProps>`
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

    &:focus:not(:disabled) {
      outline: 0 none;
      outline-offset: 0;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    ${buttonColorModifier(variant, theme)}
  `}
`
