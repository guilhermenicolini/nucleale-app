import styled from 'styled-components'
// import { Variants } from '@/presentation/styles/theme'
// import { contrast, darken, lighten } from '@/presentation/styles/utils'

export type CardProps = {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  title: string
  subtitle: string
  content: string
  children?: any
}

export const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.light.highEmphasis};
  box-shadow: ${(props) => props.theme.general.boxShadow};
  border-radius: ${(props) => props.theme.general.borderRadius};
  padding: 10px;
  border-left: 10px solid ${(props) => props.theme.colors.palette[props.color]?.color || 'transparent'}
`
