import styled, { css } from 'styled-components'

export const Content = styled.div`
  ${({ theme }) => css`
    ${theme.typography.overline};
    color: ${theme.colors.dark.disabled};
    position: fixed;
    bottom: 2px;
    left: 2px;
  `}
`
