export interface LoadInvoices {
  loadAll: () => Promise<LoadInvoices.Model[]>
}

export namespace LoadInvoices {
  export type Model = {
    id: string
    invoiceNo: number
    invoiceDate: number
    description: string
  }
}
