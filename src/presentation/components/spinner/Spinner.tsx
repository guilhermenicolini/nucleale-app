import styled from 'styled-components'
import { BaseOverlay } from '../base/BaseOverlay'
import { defaultTheme } from '@/presentation/styles/theme'
import { CSSTransition } from 'react-transition-group'
import { FC } from 'react'

export const StyledSpinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  :after {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${(props) => props.theme.colors.palette.primary.color};
    border-color: ${(props) => props.theme.colors.palette.primary.color} transparent ${(props) => props.theme.colors.palette.primary.color} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export interface SpinnerProps {
  isLoading?: boolean
}

const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => {
  return <CSSTransition in={props.isLoading} timeout={200} unmountOnExit classNames="fade">
      <BaseOverlay zIndex={defaultTheme.zIndex.spinner}>
        <StyledSpinner />
      </BaseOverlay>
    </CSSTransition>
}
export default Spinner
