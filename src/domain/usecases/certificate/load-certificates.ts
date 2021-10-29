import { CertificateModel } from '@/domain/models'

export interface LoadCertificates {
  loadAll: () => Promise<LoadCertificates.Model>
}

export namespace LoadCertificates {
  export type Model = CertificateModel[]
}
