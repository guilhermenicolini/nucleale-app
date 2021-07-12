import styled from 'styled-components'

export const BaseFieldLabel = styled.label`
  ${(props) => props.theme.typography.subtitle1}
  color: ${(props) => props.theme.colors.dark.highEmphasis};
  &.invalid {
    color: ${(props) => props.theme.colors.palette.danger.color};
  }
`
