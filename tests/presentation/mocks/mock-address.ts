import { LoadAddress, SaveAddress } from '@/domain/usecases'
import { mockAddressModel } from '@/tests/data/mocks'

export class LoadAddressSpy implements LoadAddress {
  calls = 0
  result: LoadAddress.Model = mockAddressModel()

  async load (): Promise<LoadAddress.Model> {
    this.calls++
    return this.result
  }
}

export class SaveAddressSpy implements SaveAddress {
  params: SaveAddress.Params
  calls = 0

  async save (params: SaveAddress.Params): Promise<void> {
    this.calls++
    this.params = params
  }
}
