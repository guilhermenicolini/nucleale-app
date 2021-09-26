import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { LinkButtonProps } from './LinkButton'
import { contrast, lighten, darken } from '@/presentation/styles/utils'

type StyledProps = Pick<LinkButtonProps, 'variant' | 'block'>

export const Button = styled(Link)<StyledProps>`
  ${({ theme, variant = 'primary', block = false }) => css`
    ${theme.typography.button}
    text-transform: uppercase;
    height: 40px;
    display: inline-flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.general.borderRadius};
    border: none;
    transition: background-color .2s,box-shadow .2s;
    cursor: pointer;
    padding: 0 10px;
    background-color: ${theme.colors.palette[variant].color};
    color: ${contrast(theme.colors.palette[variant].color)};
    margin-bottom: 8px;

    &.block {
      min-width: : 230px;
      width: 100%;
    }

    &:hover:not(.disabled) {
      background-color: ${darken(theme.colors.palette[variant].color, theme.colors.palette[variant].darken)};
    }
    &:focus:not(.disabled) {
      box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette[variant].color, theme.colors.palette[variant].lighten)};
      outline: 0 none;
      outline-offset: 0;
    }
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`

export const Text = styled(Link)<StyledProps>`
  ${({ theme, variant = 'primary', block = false }) => css`
    ${theme.typography.button}
    text-transform: uppercase;
    height: 40px;
    display: inline-flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.general.borderRadius};
    border: none;
    transition: background-color .2s,box-shadow .2s;
    cursor: pointer;
    padding: 0 10px;
    background-color: transparent;
    color: ${theme.colors.palette[variant].color};
    margin-bottom: 8px;

    &.block {
      min-width: : 230px;
      width: 100%;
    }

    &:hover:not(.disabled) {
      background-color: ${darken(theme.colors.palette[variant].color, theme.colors.palette[variant].darken)};
      color: ${contrast(theme.colors.palette[variant].color)};
    }
    &:focus:not(.disabled) {
      box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette[variant].color, theme.colors.palette[variant].lighten)};
      outline: 0 none;
      outline-offset: 0;
    }
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`
