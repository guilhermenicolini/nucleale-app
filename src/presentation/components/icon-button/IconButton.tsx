import { FC } from 'react'
import { Variants } from '@/presentation/styles/theme'
import * as S from './IconButton.styles'

export type IconButtonProps = {
  id?: string
  variant?: Variants
  svg?: 'fill' | 'stroke'
  children?: any
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

export const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <S.Button
      id={props.id}
      disabled={props.disabled}
      variant={props.variant}
      svg={props.svg}
      onClick={props.onClick} >
      {props.children}
    </S.Button>
  )
}
