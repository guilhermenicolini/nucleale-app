import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadInvoices } from '@/domain/usecases'
import moment from 'moment-timezone'

type Props = {
  loadInvoices: LoadInvoices
}

export const Dashboard: React.FC<Props> = ({ loadInvoices }: Props) => {
  const loadAll = async (): Promise<any> => {
    return await loadInvoices.loadAll().then(invoices => invoices.slice(0, 3).map(invoice => ({
      key: invoice.id,
      title: `# ${invoice.invoiceNo}`,
      subtitle: `R$ ${invoice.invoiceValue} - ${moment(invoice.invoiceDate).format('DD/MM/YYYY')}`,
      content: invoice.description
    })))
  }

  return (
    <Private>
      <GridPage
        title="Últimas notas"
        onLoad={loadAll} />
    </Private>
  )
}
