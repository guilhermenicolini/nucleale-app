import { FC } from 'react'
import { Variants } from '@/presentation/styles/theme'
import * as S from './Card.styles'

export type CardProps = {
  key?: string
  variant?: Variants
  title: string
  subtitle: string
  content: string
  children?: React.ReactNode
}

export const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <S.Wrapper role="card" variant={props.variant}>
      <S.Subtitle>{props.subtitle}</S.Subtitle>
      <S.Title>{props.title}</S.Title>
      <S.Content>{props.content}</S.Content>
      <S.Actions>
        {props.children}
      </S.Actions>
    </S.Wrapper>
  )
}
