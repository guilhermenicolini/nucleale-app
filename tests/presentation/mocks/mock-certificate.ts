import { LoadCertificates } from '@/domain/usecases'
import { mockCertificateItem } from '@/tests/data/mocks'

export class LoadCertificatesSpy implements LoadCertificates {
  calls = 0
  result: LoadCertificates.Model = [mockCertificateItem(), mockCertificateItem()]

  async loadAll (): Promise<LoadCertificates.Model> {
    this.calls++
    return this.result
  }
}
