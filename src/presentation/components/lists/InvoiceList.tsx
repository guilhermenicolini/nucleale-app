import { LoadInvoices } from '@/domain/usecases'
import { Card } from '@/presentation/components'
import * as S from './List.styles'
import React from 'react'
import moment from 'moment-timezone'

type Props = {
  invoices: LoadInvoices.Model[]
}

export const InvoiceList: React.FC<Props> = ({ invoices }: Props) => {
  return (
    <>
      {invoices?.length > 0
        ? invoices.map((invoice: LoadInvoices.Model) => <Card
          key={invoice.id}
          title={`# ${invoice.invoiceNo}`}
          subtitle={`R$ ${invoice.invoiceValue} - ${moment(invoice.invoiceDate).format('DD/MM/YYYY')}`}
          content={invoice.description}
           />)
        : <S.EmptyCard>Nenhum registro encontrado</S.EmptyCard>
      }
    </>
  )
}
