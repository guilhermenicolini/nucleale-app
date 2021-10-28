import { Dashboard } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadInvoices, makeRemoteDownloadFile } from '@/main/factories/usecases'

export const makeDashboard: React.FC = () => {
  return (
    <Dashboard
      loadInvoices={makeRemoteLoadInvoices()}
      downloadFile={makeRemoteDownloadFile('/me/invoices/:id/download')} />
  )
}
