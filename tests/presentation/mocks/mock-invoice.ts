import { LoadInvoices } from '@/domain/usecases'
import { mockInvoiceItem } from '@/tests/data/mocks'

export class LoadInvoicesSpy implements LoadInvoices {
  calls = 0
  result: LoadInvoices.Model = [mockInvoiceItem(), mockInvoiceItem()]

  async loadAll (): Promise<LoadInvoices.Model> {
    this.calls++
    return this.result
  }
}
