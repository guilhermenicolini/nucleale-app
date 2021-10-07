import React, { useState, useEffect } from 'react'
import { Spinner, Card, Reload, IconButton } from '@/presentation/components'
import * as S from './GridPage.styles'
import { useErrorHandler } from '@/presentation/hooks'
import { DownloadIcon } from '../icons'
export { DownloadIcon } from '@/presentation/components/icons'

type ListItem = {
  key: string
  title: string
  subtitle: string
  content: string
}

type DownloadProps = {
  type: string
  fileNamePrefix: string
  onDownload: (id: string) => Promise<{fileName: string, data: Buffer}>
}

type Props = {
  title: string
  mimeType?: string
  onLoad: () => Promise<ListItem[]>
  downloadProps?: DownloadProps
}

export const GridPage: React.FC<Props> = ({ title, onLoad, downloadProps }: Props) => {
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

  const download = async (id: string): Promise<void> => {
    const response = await downloadProps.onDownload(id)
    const blob = new Blob([response.data], { type: downloadProps.type })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.target = '_blank'
    link.download = `${downloadProps.fileNamePrefix}-${response.fileName}`
    link.click()
  }

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
          {state.records.map((item: ListItem) =>
            <Card
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              content={item.content} >
                {downloadProps &&
                  <IconButton
                    variant="primary"
                    svg="stroke"
                    onClick={async () => await download(item.key)}><DownloadIcon /></IconButton>
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
