import styled from 'styled-components'

export const BaseFieldWrapper = styled.div<any>`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  position: relative;

  & svg {
    position: absolute;
    top: ${(props) => props.hasLabel ? '23px' : '5px'};
    right: 5px;
  }
`
