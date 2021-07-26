import { FC } from 'react'
import { Overlay } from '../overlay/Overlay.styles'
import * as S from './Modal.styles'
import { Button } from '../button/Button'
import { CSSTransition } from 'react-transition-group'
import { defaultTheme } from '@/presentation/styles/theme'

export type ModalProps = {
  title: string
  content: string
  show?: boolean
  children?: React.ReactNode
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  return <CSSTransition in={props.show} timeout={200} unmountOnExit classNames="fade">
    <Overlay zIndex={defaultTheme.zIndex.modal}>
      <S.Wrapper>
        <S.Title>{props.title}</S.Title>
        <S.Separator />
        <S.Content>{props.content}</S.Content>
        <S.Actions>
          <Button variant="danger">Yes</Button>
          <Button variant="secondary">No</Button>
        </S.Actions>
      </S.Wrapper>
    </Overlay>
  </CSSTransition>
}
export default Modal
