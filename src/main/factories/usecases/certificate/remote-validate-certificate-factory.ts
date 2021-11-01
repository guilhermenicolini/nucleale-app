import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'
import { RemoteValidateCertificate } from '@/data/usecases'
import { ValidateCertificate } from '@/domain/usecases'

export const makeRemoteValidateCertificate = (hash: string): ValidateCertificate => {
  return new RemoteValidateCertificate(makeApiUrl(`/certificates/${hash}`), makeAxiosHttpAdapter())
}
