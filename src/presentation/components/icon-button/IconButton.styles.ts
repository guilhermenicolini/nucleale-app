import styled, { css } from 'styled-components'
import { IconButtonProps } from './IconButton'
import { darken } from '@/presentation/styles/utils'

type StyledProps = Pick<IconButtonProps, 'variant' | 'svg'>

const svgModifier = {
  fill: (color: string) => css`
    fill: ${color};
  `,
  stroke: (color: string) => css`
    stroke: ${color};
  `
}

export const Button = styled.button<StyledProps>`
  ${({ theme, variant = 'primary', svg = 'fill' }) => css`
    height: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    & svg {
      height: 20px !important;
      & path {
        transition: fill .2s, stroke .2s;
        ${svgModifier[svg](theme.colors.palette[variant].color)}
      }
    }
    &:hover:not(:disabled) svg path {
      ${svgModifier[svg](darken(theme.colors.palette[variant].color, theme.colors.palette[variant].darken))}
    }
    &:focus:not(:disabled) {
      outline: 0 none;
      outline-offset: 0;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`
