import { Invoices } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadInvoices, makeRemoteDownloadFile } from '@/main/factories/usecases'

export const makeInvoices: React.FC = () => {
  return (
    <Invoices
      loadInvoices={makeRemoteLoadInvoices()}
      downloadFile={makeRemoteDownloadFile('/invoices/:id/download')} />
  )
}
