import React from 'react'
import * as S from './Header.styles'
import { Logotype } from '@/presentation/components/logos'
import { IconButton, Menu } from '@/presentation/components'
import { LogoutIcon } from '@/presentation/components/icons'

type HeaderProps = {
  onLogout: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children, onLogout }: HeaderProps) => {
  return (
    <S.Section>
      <S.Header>
        <Logotype />
        <Menu />
        <IconButton id="logout" variant="white" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </S.Header>
    </S.Section>
  )
}
