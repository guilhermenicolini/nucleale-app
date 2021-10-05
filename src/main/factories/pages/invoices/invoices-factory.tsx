import { Invoices } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadInvoices } from '../../usecases'

export const makeInvoices: React.FC = () => {
  return (
    <Invoices
      loadInvoices={makeRemoteLoadInvoices()} />
  )
}
