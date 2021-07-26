import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: ${parseInt(theme.zIndex.modal) + 1};
    background-color: ${theme.colors.light.highEmphasis};
    box-shadow: ${theme.general.boxShadow};
    border-radius: ${theme.general.borderRadius};
    margin: 10px;
    padding: 10px;
    width: 310px;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.subtitle1};
    color: ${theme.colors.dark.highEmphasis};
  `}
`

export const Separator = styled.hr`
  ${({ theme }) => css`
    border: none;
    border-top: 1px solid ${theme.general.placeHolder};
    margin: 10px 0 20px;
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body2};
    color: ${theme.colors.dark.mediumEmphasis};
  `}
`

export const Actions = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;

  & * {
    margin: 3px;
  }
`
