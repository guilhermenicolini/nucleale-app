import { LoadAddress } from '@/domain/usecases'
import { mockAddressModel } from '@/tests/data/mocks'

export class LoadAddressSpy implements LoadAddress {
  calls = 0
  result: LoadAddress.Model = mockAddressModel()

  async load (): Promise<LoadAddress.Model> {
    this.calls++
    return this.result
  }
}
