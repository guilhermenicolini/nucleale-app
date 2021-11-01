import { CertificateModel } from '@/domain/models'

export interface ValidateCertificate {
  validate: () => Promise<ValidateCertificate.Model>
}

export namespace ValidateCertificate {
  export type Model = Pick<CertificateModel, 'hash' | 'course' | 'date'>
}
