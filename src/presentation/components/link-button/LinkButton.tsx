import { FC } from 'react'
import { Variants } from '@/presentation/styles/theme'
import * as S from './LinkButton.styles'

export type LinkButtonProps = {
  variant?: Variants
  type?: 'button' | 'submit'
  disabled?: boolean
  children?: React.ReactNode
}

export const LinkButton: FC<LinkButtonProps> = (props: LinkButtonProps) => {
  return (
    <S.LinkButton type={props.type || 'button'} disabled={props.disabled} variant={props.variant} >{props.children}</S.LinkButton>
  )
}
