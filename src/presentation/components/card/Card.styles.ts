import styled, { css } from 'styled-components'
import { CardProps } from './Card'

type StyledProps = Pick<CardProps, 'variant'>

export const Wrapper = styled.div<StyledProps>`
  ${({ theme, variant }) => css`
    position: relative;
    background-color: ${theme.colors.light.highEmphasis};
    box-shadow: ${theme.general.boxShadow};
    border-radius: ${theme.general.borderRadius};
    padding: 10px;
    border-left: 10px solid ${theme.colors.palette[variant]?.color || 'transparent'};
  `}
`

export const Subtitle = styled.div`
  ${({ theme }) => css`
    ${theme.typography.overline};
    color: ${theme.colors.dark.highEmphasis};
    margin-bottom: 5px;
  `}
`
export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline6};
    color: ${theme.colors.dark.highEmphasis};
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body2};
    color: ${theme.colors.dark.mediumEmphasis};
    margin-top: 5px;
  `}
`

export const Actions = styled.div`
  position: absolute;
  display: flex;
  top: 10px;
  right: 10px;

  & > * {
    margin: 0 3px;
  }

`
