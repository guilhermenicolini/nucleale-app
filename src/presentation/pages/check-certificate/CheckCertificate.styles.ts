import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.light.highEmphasis};
    box-shadow: ${theme.general.boxShadow};
    border-radius: ${theme.general.borderRadius};
    padding: 10px;
  `}
  
`

export const Message = styled.div<{ align?: 'center' | 'left' }>`
  ${({ theme }) => css`
    margin-bottom: 20px;
    width: 280px;
    & p {
      padding: 3px;
    }
    & .title {
      font-weight: 500;
    }
    & .valid {
      font-weight: 500;
      color: ${theme.colors.palette.success.color}
    }
    & .invalid {
      font-weight: 500;
      color: ${theme.colors.palette.danger.color}
    }
  `}
`
