import React from 'react'
import * as S from './Private.styles'
import { Header, Footer } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

type PrivateProps = {
  children?: React.ReactNode
}

export const Private: React.FC<PrivateProps> = ({ children }: PrivateProps) => {
  const logout = useLogout()

  const doLogout = (): void => {
    logout()
  }

  return (
    <S.Wrapper>
      <Header onLogout={doLogout} />
      <S.Content>
        {children}
      </S.Content>
      <Footer />
    </S.Wrapper>
  )
}
