import { FC } from 'react'
import { CardWrapper } from './CardWrapper'
import { CardSubtitle } from './CardSubtitle'
import { CardTitle } from './CardTitle'
import { CardContent } from './CardContent'
import { CardActions } from './CardActions'

export interface CardProps {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info'
  title: string
  subtitle: string
  content: string
  children?: any
}

const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <CardWrapper color={props.color}>
      <CardSubtitle>{props.subtitle}</CardSubtitle>
      <CardTitle>{props.title}</CardTitle>
      <CardContent>{props.content}</CardContent>
      <CardActions>
        {props.children}
      </CardActions>
    </CardWrapper>
  )
}
export default Card
