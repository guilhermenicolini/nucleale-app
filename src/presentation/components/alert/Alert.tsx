import { FC } from 'react'
import { AlertWrapper } from './AlertWrapper'
import { AlertIcon } from './AlertIcon'
import { AlertMessage } from './AlertMessage'

export interface AlertProps {
  color: 'danger' | 'warning' | 'success' | 'info'
  message: string
}

const Alert: FC<AlertProps> = (props: AlertProps) => {
  return (
    <AlertWrapper color={props.color}>
      <AlertIcon color={props.color} />
      <AlertMessage color={props.color}>{props.message}</AlertMessage>
    </AlertWrapper>
  )
}
export default Alert
