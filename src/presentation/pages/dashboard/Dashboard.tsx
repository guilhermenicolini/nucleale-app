import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadInvoices, DownloadFile } from '@/domain/usecases'
import moment from 'moment-timezone'

type Props = {
  loadInvoices: LoadInvoices
  downloadFile: DownloadFile
}

export const Dashboard: React.FC<Props> = ({ loadInvoices, downloadFile }: Props) => {
  const loadAll = async (): Promise<any> => {
    return await loadInvoices.loadAll().then(invoices => invoices.slice(0, 3).map(invoice => ({
      key: invoice.invoiceNo,
      title: `# ${invoice.invoiceNo}`,
      subtitle: `R$ ${invoice.invoiceValue} - ${moment(invoice.invoiceDate).format('DD/MM/YYYY')}`,
      content: invoice.description
    })))
  }

  const download = async (id: string): Promise<DownloadFile.Model> => {
    return await downloadFile.download(id)
  }

  return (
    <Private>
      <GridPage
        title="Últimas notas"
        onLoad={loadAll}
        onDownload={download} />
    </Private>
  )
}
