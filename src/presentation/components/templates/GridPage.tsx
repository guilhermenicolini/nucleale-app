import React, { useState, useEffect } from 'react'
import { Spinner, Card, Reload, IconButton } from '@/presentation/components'
import * as S from './GridPage.styles'
import { useErrorHandler } from '@/presentation/hooks'
import { DownloadIcon } from '../icons'
import { DownloadFile } from '@/domain/usecases'
import { toast } from 'react-toastify'
export { DownloadIcon } from '@/presentation/components/icons'

type ListItem = {
  key: string
  title: string
  subtitle: string
  content: string
}

type Props = {
  title: string
  mimeType?: string
  onLoad: () => Promise<ListItem[]>
  onDownload?: (id: string) => Promise<DownloadFile.Model>
}

export const GridPage: React.FC<Props> = ({ title, onLoad, onDownload }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    records: null,
    error: '',
    reload: false
  })

  const handleLoadError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false, error: error.message }))
  })

  const handleToastError = useErrorHandler((error: Error) => {
    toast.error(error.message)
    setState(old => ({ ...old, error: '', isLoading: false }))
  })

  const reload = (): void => setState(old => ({ ...old, invoices: [], error: '', reload: !old.reload }))

  const download = (id: string): void => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    onDownload(id)
      .then(response => {
        setState(old => ({ ...old, error: '', isLoading: false }))
        console.log(response)
        const blob = new Blob([response.data], { type: response.mimeType })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        link.download = response.fileName
        link.click()
      })
      .catch(handleToastError)
  }

  useEffect(() => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    onLoad()
      .then(records => setState(old => ({ ...old, error: '', isLoading: false, records })))
      .catch(handleLoadError)
  }, [state.reload])

  return (
    <S.Wrapper>
      <S.Heading>
        {title}
      </S.Heading>
      {state.records && state.records.length > 0 &&
        <S.Content>
          {state.records.map((item: ListItem) =>
            <Card
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              content={item.content} >
                {onDownload &&
                  <IconButton
                    variant="primary"
                    svg="stroke"
                    onClick={async () => download(item.key)}><DownloadIcon /></IconButton>
                }
            </Card>)}
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
