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
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    & > div {
      min-width: 300px;
      max-width: 372px;
      margin: 15px;
    }

    @media only screen and (min-width: ${theme.breakPoint.tablet}px) {
      & > div {
        min-width: 472px;
        margin: 30px;
      }
    }
  `}
`

export const EmptyRow = styled.div``

export const ErrorRow = styled.div``
