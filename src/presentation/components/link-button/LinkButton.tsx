import { FC } from 'react'
import { Variants } from '@/presentation/styles/theme'
import * as S from './LinkButton.styles'

export type LinkButtonProps = {
  variant?: Variants
  type?: 'button' | 'text'
  disabled?: boolean
  block?: boolean
  children?: React.ReactNode
  to?: string
  onClick?: (e?: React.MouseEvent) => void
}

export const LinkButton: FC<LinkButtonProps> = (
  {
    type = 'button',
    block = false,
    disabled = false,
    to,
    children,
    variant = 'primary',
    onClick
  }: LinkButtonProps) => {
  const styles = []
  if (disabled) {
    styles.push('disabled')
  }
  if (block) {
    styles.push('block')
  }

  return (
    type === 'button'
      ? <S.Button
        variant={variant}
        className={styles.join(' ')}
        to={to}
        onClick={onClick}
        >
          {children}
      </S.Button>
      : <S.Text
        variant={variant}
        className={styles.join(' ')}
        to={to}
        onClick={onClick}>
        {children}
      </S.Text>
  )
}
