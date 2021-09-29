import React from 'react'
import * as S from './Footer.styled'

import config from '../../../../package.json'

export const Footer: React.FC = () => {
  return (
    <S.Content>
      v{config.version}
    </S.Content>
  )
}
