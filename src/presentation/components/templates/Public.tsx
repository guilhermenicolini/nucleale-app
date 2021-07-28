import React from 'react'
import * as S from './Public.styles'
import { Logotype, Logomark, Slogan } from '../logos'

type PublicProps = {
  children?: React.ReactNode
}

export const Public: React.FC<PublicProps> = (props: PublicProps) => {
  return (
    <S.Content>
      <S.ColumnHeader>
        <S.Header>
          <S.Slogan><Slogan /></S.Slogan>
          <S.Brand><Logotype /></S.Brand>
          <S.Logo><Logomark /></S.Logo>
        </S.Header>
      </S.ColumnHeader>
      <S.ColumnContent>
        {props.children}
      </S.ColumnContent>
    </S.Content>
  )
}
