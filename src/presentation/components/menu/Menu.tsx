import React from 'react'
import * as S from './Menu.styles'

export type MenuProps = {
  mode?: 'light' | 'dark'
  orientation?: 'horizontal' | 'vertical'
}

export const Menu: React.FC<MenuProps> = ({ mode = 'light', orientation = 'horizontal' }: MenuProps) => {
  return (
    <S.Nav orientation={orientation}>
      <S.Menu orientation={orientation}>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/">Painel</S.ReactLink></S.Item>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/invoices">Notas Fiscais</S.ReactLink></S.Item>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/certificates">Certificados</S.ReactLink></S.Item>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/address">Endereço</S.ReactLink></S.Item>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/childrens">Filhos</S.ReactLink></S.Item>
        <S.Item orientation={orientation}><S.ReactLink exact mode={mode} to="/family">Família</S.ReactLink></S.Item>
      </S.Menu>
    </S.Nav>
  )
}
