import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export const Heading = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline5};
    text-align: center;
    margin-bottom: 20px;
  `}
`

export const Content = styled.div`
  
`
export const Invoices = styled.div<{ hasCards?: boolean }>`
  ${({ hasCards = true, theme }) => css`
    margin: 0 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr;

    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      grid-template-columns: ${hasCards ? '1fr 1fr' : '1fr'};
    }
  `}
`
