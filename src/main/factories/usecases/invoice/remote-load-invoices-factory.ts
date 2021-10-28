import { RemoteLoadInvoices } from '@/data/usecases'
import { LoadInvoices } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadInvoices = (): LoadInvoices => {
  return new RemoteLoadInvoices(makeApiUrl('/me/invoices'), makeAuthorizeHttpClientDecorator())
}
