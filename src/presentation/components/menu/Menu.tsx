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
        <S.Item orientation={orientation}><S.NavLink mode={mode} to="/">Painel</S.NavLink></S.Item>
        <S.Item orientation={orientation}><S.NavLink mode={mode} to="/invoices">Notas Fiscais</S.NavLink></S.Item>
        <S.Item orientation={orientation}><S.NavLink mode={mode} to="/address">Endereço</S.NavLink></S.Item>
        <S.Item orientation={orientation}><S.NavLink mode={mode} to="/childrens">Filhos</S.NavLink></S.Item>
        <S.Item orientation={orientation}><S.NavLink mode={mode} to="/family">Família</S.NavLink></S.Item>
      </S.Menu>
    </S.Nav>
  )
}
