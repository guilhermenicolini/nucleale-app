import { FC } from 'react'
import { BaseButton } from '@/presentation/components/base'

export interface ButtonProps {
  label: string
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  disabled?: boolean
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <BaseButton disabled={props.disabled} color={props.color} >{props.label}</BaseButton>
  )
}
export default Button
