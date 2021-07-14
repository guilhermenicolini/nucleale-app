import { FC } from 'react'
import { ModalOverlay } from './ModalOverlay'
import { ModalWrapper } from './ModalWrapper'
import { ModalTitle } from './ModalTitle'
import { ModalSeparator } from './ModalSeparator'
import { ModalContent } from './ModalContent'
import { ModalActions } from './ModalActions'
import Button from '../button/Button'

export interface ModalProps {
  title: string
  content: string
  show?: boolean
  children?: any
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  return props.show
    ? (
    <ModalOverlay>
      <ModalWrapper>
        <ModalTitle>{props.title}</ModalTitle>
        <ModalSeparator />
        <ModalContent>{props.content}</ModalContent>
        <ModalActions>
          <Button label="Yes" color="danger" />
          <Button label="No" color="secondary" />
        </ModalActions>
      </ModalWrapper>
    </ModalOverlay>
      )
    : null
}
export default Modal
