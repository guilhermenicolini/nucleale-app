import { AddressModel } from '@/domain/models'

export interface LoadAddress {
  load: () => Promise<LoadAddress.Model>
}

export namespace LoadAddress {
  export type Model = AddressModel
}
