import React from 'react'
import * as S from './SideMenu.styles'
import { CloseIcon } from '@/presentation/components/icons'
import { IconButton } from '..'
import { Logotype } from '@/presentation/components/logos'

type Props = {
  opened?: boolean
  onCloseMenu: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const SideMenu: React.FC<Props> = ({ opened = false, onCloseMenu, children }: Props) => {
  return (
    <S.Section>
      <S.Menu className={opened ? 'opened' : ''}>
        <S.Header>
          <Logotype />
          <IconButton variant="black" onClick={onCloseMenu}>
            <CloseIcon />
          </IconButton>
        </S.Header>
        <S.Content>
          {children}
        </S.Content>
      </S.Menu>
    </S.Section>
  )
}
