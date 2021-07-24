import { FC } from 'react'
import { Variants } from '@/presentation/styles/theme'
import * as S from './IconButton.styles'

export type IconButtonProps = {
  variant?: Variants
  svg?: 'fill' | 'stroke'
  children?: any
  disabled?: boolean
}

const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <S.Button disabled={props.disabled} variant={props.variant} svg={props.svg}>
      {props.children}
    </S.Button>
  )
}

export default IconButton
