import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadInvoices } from '@/domain/usecases'
import moment from 'moment-timezone'
import { Buffer } from 'buffer'

type Props = {
  loadInvoices: LoadInvoices
}

export const Invoices: React.FC<Props> = ({ loadInvoices }: Props) => {
  const loadAll = async (): Promise<any> => {
    return await loadInvoices.loadAll().then(invoices => invoices.map(invoice => ({
      key: invoice.id,
      title: `# ${invoice.invoiceNo}`,
      subtitle: `R$ ${invoice.invoiceValue} - ${moment(invoice.invoiceDate).format('DD/MM/YYYY')}`,
      content: invoice.description
    })))
  }

  const download = async (): Promise<{fileName: string, data: Buffer}> => {
    return {
      fileName: '234.txt',
      data: Buffer.from('teste')
    }
  }

  return (
    <Private>
      <GridPage
        title="Notas Fiscais"
        onLoad={loadAll}
        downloadProps={(
          {
            type: 'text/plain',
            fileNamePrefix: 'invoice',
            onDownload: download
          }
        )} />
    </Private>
  )
}
