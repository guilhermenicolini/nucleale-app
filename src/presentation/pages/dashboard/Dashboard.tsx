import React, { useEffect, useState } from 'react'
import { Private, Reload, Spinner, InvoiceList } from '@/presentation/components'
import * as S from './Dashboard.styles'
import { LoadInvoices } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadInvoices: LoadInvoices
}

export const Dashboard: React.FC<Props> = ({ loadInvoices }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    invoices: [] as LoadInvoices.Model[],
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false, error: error.message }))
  })

  const reload = (): void => setState(old => ({ ...old, invoices: [], error: '', reload: !old.reload }))

  useEffect(() => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    loadInvoices.loadAll()
      .then(invoices => setState(old => ({ ...old, error: '', isLoading: false, invoices: invoices.slice(0, 3) })))
      .catch(handleError)
  }, [state.reload])

  return (
    <Private>
      <S.Wrapper>
        <S.Heading>
          Últimas Notas
        </S.Heading>
        <S.Content>
        {state.error
          ? <Reload message={state.error} onReload={reload} />
          : <S.Invoices hasCards={state.invoices?.length > 0}>
              <InvoiceList invoices={state.invoices} />
            </S.Invoices>
        }
        </S.Content>
        <Spinner isLoading={state.isLoading} />
      </S.Wrapper>
    </Private>
  )
}
