import { FC } from 'react'
import { Overlay } from '../overlay/Overlay.styles'
import * as S from './Spinner.styles'
import { CSSTransition } from 'react-transition-group'
import { defaultTheme } from '@/presentation/styles/theme'

export type SpinnerProps = {
  isLoading?: boolean
}

export const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => {
  return <CSSTransition in={props.isLoading} timeout={200} unmountOnExit classNames="fade">
    <Overlay zIndex={defaultTheme.zIndex.spinner}>
      <S.Spinner className="spinner" />
    </Overlay>
  </CSSTransition>
}
