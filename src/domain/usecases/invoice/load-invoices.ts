import { InvoiceModel } from '@/domain/models'

export interface LoadInvoices {
  loadAll: () => Promise<LoadInvoices.Model>
}

export namespace LoadInvoices {
  export type Model = InvoiceModel[]
}
