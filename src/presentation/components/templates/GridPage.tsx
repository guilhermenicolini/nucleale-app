import React, { useState, useEffect } from 'react'
import { Spinner, Card, Reload } from '@/presentation/components'
import * as S from './GridPage.styles'
import { useErrorHandler } from '@/presentation/hooks'

type ListItem = {
  key: string
  title: string
  subtitle: string
  content: string
}

type Props = {
  title: string
  onLoad: () => Promise<ListItem[]>
}

export const GridPage: React.FC<Props> = ({ title, onLoad }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    records: null,
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    console.log('handle error', error)
    setState(old => ({ ...old, isLoading: false, error: error.message }))
  })

  const reload = (): void => setState(old => ({ ...old, invoices: [], error: '', reload: !old.reload }))

  useEffect(() => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    onLoad()
      .then(records => setState(old => ({ ...old, error: '', isLoading: false, records })))
      .catch(handleError)
  }, [state.reload])

  return (
    <S.Wrapper>
      <S.Heading>
        {title}
      </S.Heading>
      {state.records && state.records.length > 0 &&
        <S.Content>
          {state.records.map((item: ListItem) => <Card key={item.key} title={item.title} subtitle={item.subtitle} content={item.content} />)}
        </S.Content>
      }
      {state.records && state.records.length === 0 &&
        <S.EmptyRow>Nenhum registro encontrado</S.EmptyRow>
      }
      {state.error &&
        <S.EmptyRow>
          <Reload onReload={reload} message={state.error} />
        </S.EmptyRow>
      }
      <Spinner isLoading={state.isLoading} />
     </S.Wrapper>
  )
}
