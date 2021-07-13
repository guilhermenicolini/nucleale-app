import styled from 'styled-components'

export const CardWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.light.highEmphasis};
  box-shadow: ${(props) => props.theme.general.boxShadow};
  border-radius: ${(props) => props.theme.general.borderRadius};
  padding: 10px;
  border-left: 10px solid ${(props) => props.theme.colors.palette[props.color]?.color || 'transparent'}
`
