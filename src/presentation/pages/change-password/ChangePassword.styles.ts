import styled, { css } from 'styled-components'

export const Form = styled.form`
  width: 100%;
  max-width: 280px;
  margin: 10px 10px 0 10px;
`

export const Actions = styled.div`
  width: 100%;
  max-width: 280px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Message = styled.div<{ align?: 'center' | 'left' }>`
  ${({ align = 'center' }) => css`
    margin-bottom: 20px;
    width: 280px;
    text-align: ${align};
  `}
`
