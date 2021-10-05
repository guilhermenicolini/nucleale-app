import { Dashboard } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadInvoices } from '../../usecases'

export const makeDashboard: React.FC = () => {
  return (
    <Dashboard
      loadInvoices={makeRemoteLoadInvoices()} />
  )
}
