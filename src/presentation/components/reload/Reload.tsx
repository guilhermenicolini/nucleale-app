import { FC } from 'react'
import { Button } from '@/presentation/components'
import * as S from './Reload.styles'

export type ReloadProps = {
  message: string
  onReload?: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Reload: FC<ReloadProps> = ({ message, onReload }: ReloadProps) => {
  return (
    <>
      <S.Message>{message}</S.Message>
      <Button block variant="secondary" onClick={onReload}>Tentar novamente</Button>
    </>
  )
}
