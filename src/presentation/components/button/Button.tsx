import { Variants } from '@/presentation/styles/theme'
import { FC } from 'react'
import * as S from './Button.styles'

export type ButtonProps = {
  variant?: Variants
  block?: boolean
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <S.Button
      variant={props.variant}
      block={props.block}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </S.Button>
  )
}
