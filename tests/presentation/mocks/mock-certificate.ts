import { LoadCertificates, ValidateCertificate } from '@/domain/usecases'
import { mockCertificateItem, mockValidCertificateItem } from '@/tests/data/mocks'

export class LoadCertificatesSpy implements LoadCertificates {
  calls = 0
  result: LoadCertificates.Model = [mockCertificateItem(), mockCertificateItem()]

  async loadAll (): Promise<LoadCertificates.Model> {
    this.calls++
    return this.result
  }
}

export class ValidateCertificateSpy implements ValidateCertificate {
  calls = 0
  result: ValidateCertificate.Model = mockValidCertificateItem()

  async validate (): Promise<ValidateCertificate.Model> {
    this.calls++
    return this.result
  }
}
