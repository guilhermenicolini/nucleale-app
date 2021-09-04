import styled, { css } from 'styled-components'
import { FieldProps } from './Field'
import { lighten } from '@/presentation/styles/utils'

type StyledProps = Pick<FieldProps, 'label'>

export const Wrapper = styled.div<StyledProps>`
  ${({ label }) => css`
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    position: relative;

    & svg {
      position: absolute;
      top: ${label ? '23px' : '5px'};
      right: 5px;
    }
  `}
`

export const Label = styled.label<{ htmlFor: string }>`
  ${({ theme }) => css`
    ${theme.typography.subtitle1};
    color: ${theme.colors.dark.highEmphasis};
    
    &.invalid {
      color: ${theme.colors.palette.danger.color};
    }
  `}
`

export const Field = styled.input`
  ${({ theme }) => css`
    min-width: 230px;
    height: 30px;
    border-radius: ${theme.general.borderRadius};
    border: 1px solid ${theme.general.form};
    padding-left: 3px;
    margin-bottom: 2px;
    transition: background-color .2s,color .2s,border-color .2s,box-shadow .2s;
    color: ${theme.colors.dark.highEmphasis};

    ::placeholder {
      color: ${theme.general.placeholder};
    }
    &:enabled.invalid {
      border-color: ${theme.colors.palette.danger.color};
    }
    &:enabled:hover:not(.invalid) {
      border-color: ${theme.colors.palette.primary.color};
    }
    &:enabled:focus {
      box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette.primary.color, theme.colors.palette.primary.lighten)};
      outline: 0 none;
      outline-offset: 0;
      border-color: ${theme.colors.palette.primary};
    }
    &.invalid:enabled:focus {
      box-shadow: 0 0 0 0.15rem ${lighten(theme.colors.palette.danger.color, theme.colors.palette.danger.lighten)};
      outline: 0 none;
      outline-offset: 0;
      border-color: ${theme.colors.palette.danger.color};
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      border-color: ${theme.colors.dark.disabled};
      color: ${theme.colors.dark.disabled};
    }
  `}
`

export const Span = styled.span`
  ${({ theme }) => css`
    ${theme.typography.caption};
    color: ${theme.colors.palette.danger.color};
    min-height: 13px;
  `}
`
