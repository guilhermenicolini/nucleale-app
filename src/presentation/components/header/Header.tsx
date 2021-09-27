import React from 'react'
import * as S from './Header.styles'
import { Logotype } from '@/presentation/components/logos'
import { IconButton, Menu } from '@/presentation/components'
import { LogoutIcon, HamburgerIcon } from '@/presentation/components/icons'

type HeaderProps = {
  opened: boolean
  onOpenMenu: (e?: React.MouseEvent) => void
  onLogout: (e?: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children, opened, onOpenMenu, onLogout }: HeaderProps) => {
  return (
    <S.Section>
      <S.Header>
        <Logotype />
        <Menu />
        <IconButton id="logout" variant="white" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
        <IconButton id="menu" variant="white" onClick={onOpenMenu}>
          <HamburgerIcon />
        </IconButton>
      </S.Header>
  </S.Section>
  )
}
