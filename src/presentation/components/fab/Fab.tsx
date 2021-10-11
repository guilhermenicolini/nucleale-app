import { Variants } from '@/presentation/styles/theme'
import { FC } from 'react'
import * as S from './Fab.styles'

export type FabProps = {
  variant?: Variants
  disabled?: boolean
  name?: string
  onClick?: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Fab: FC<FabProps> = (props: FabProps) => {
  return (
    <S.Button
      disabled={props.disabled}
      variant={props.variant}
      name={props.name}
      onClick={props.onClick} >
        {props.children}
    </S.Button>
  )
}
