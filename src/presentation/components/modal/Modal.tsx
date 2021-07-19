import { FC } from 'react'
import { BaseOverlay } from '../base/BaseOverlay'
import { ModalWrapper } from './ModalWrapper'
import { ModalTitle } from './ModalTitle'
import { ModalSeparator } from './ModalSeparator'
import { ModalContent } from './ModalContent'
import { ModalActions } from './ModalActions'
import Button from '../button/Button'
import { CSSTransition } from 'react-transition-group'
import { defaultTheme } from '@/presentation/styles/theme'

export interface ModalProps {
  title: string
  content: string
  show?: boolean
  children?: any
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  return <CSSTransition in={props.show} timeout={200} unmountOnExit classNames="fade">
      <BaseOverlay zIndex={defaultTheme.zIndex.modal}>
        <ModalWrapper>
          <ModalTitle>{props.title}</ModalTitle>
          <ModalSeparator />
          <ModalContent>{props.content}</ModalContent>
          <ModalActions>
            <Button label="Yes" color="danger" />
            <Button label="No" color="secondary" />
          </ModalActions>
        </ModalWrapper>
      </BaseOverlay>
    </CSSTransition>
}
export default Modal
