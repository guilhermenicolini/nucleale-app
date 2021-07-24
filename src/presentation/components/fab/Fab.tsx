import { Variants } from '@/presentation/styles/theme'
import { FC } from 'react'
import * as S from './Fab.styles'

export interface FabProps {
  variant?: Variants
  disabled?: boolean
  children?: React.ReactNode
}

const Fab: FC<FabProps> = (props: FabProps) => {
  return (
    <S.Button disabled={props.disabled} variant={props.variant}>{props.children}</S.Button>
  )
}

export default Fab
