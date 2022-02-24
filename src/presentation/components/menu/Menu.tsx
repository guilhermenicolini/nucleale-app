import React from 'react'
import * as S from './Menu.styles'

export type MenuProps = {
  mode?: 'light' | 'dark'
  orientation?: 'horizontal' | 'vertical'
}

export const Menu: React.FC<MenuProps> = ({ mode = 'light', orientation = 'horizontal' }: MenuProps) => {
  return (
    <S.Nav>
      <S.Menu>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/">
            <i className='bx bx-home'></i>
            Painel
          </S.ReactLink>
        </S.Item>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/invoices">
            <i className='bx bx-receipt'></i>
            Notas Fiscais
          </S.ReactLink>
        </S.Item>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/certificates">
            <i className='bx bx-award'></i>
            Certificados
          </S.ReactLink>
        </S.Item>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/address">
            <i className='bx bx-map'></i>
            Endereço
          </S.ReactLink>
        </S.Item>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/childrens">
            <i className='bx bx-face'></i>
            Filhos
          </S.ReactLink>
        </S.Item>
        <S.Item>
          <S.ReactLink exact mode={mode} to="/family">
            <i className='bx bx-group'></i>
            Família
          </S.ReactLink>
        </S.Item>
      </S.Menu>
    </S.Nav>
  )
}
