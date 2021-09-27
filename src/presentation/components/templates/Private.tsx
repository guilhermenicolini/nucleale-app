import React, { useState } from 'react'
import * as S from './Private.styles'
import { Header, SideMenu, Menu, LinkButton } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

type PrivateProps = {
  children?: React.ReactNode
}

export const Private: React.FC<PrivateProps> = ({ children }: PrivateProps) => {
  const logout = useLogout()
  const [state, setState] = useState({
    opened: false
  })

  const openMenu = (): void => {
    setState(s => ({ ...s, opened: true }))
  }

  const closeMenu = (): void => {
    setState(s => ({ ...s, opened: false }))
  }

  const doLogout = (): void => {
    logout()
  }

  return (
    <S.Wrapper>
      <Header onOpenMenu={openMenu} onLogout={doLogout} opened={state.opened} />
      <SideMenu onCloseMenu={closeMenu} opened={state.opened}>
        < Menu mode="dark" orientation="vertical" />
        <LinkButton type="text" block onClick={doLogout}>Sair</LinkButton>
      </SideMenu>
      <S.Content>
        {children}
        <div>{state.opened.toString()}</div>
      </S.Content>
    </S.Wrapper>
  )
}
