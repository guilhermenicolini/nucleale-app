import { AddressModel } from '@/domain/models'

export interface FindLocation {
  find: (zip: string) => Promise<FindLocation.Model>
}

export namespace FindLocation {
  export type Model = Pick<AddressModel, 'address' | 'district' | 'city' | 'state'>
}
