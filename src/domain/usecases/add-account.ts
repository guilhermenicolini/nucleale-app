import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    taxId: string
    name: string
    email: string
    mobilePhone: string
    birth: number
    password: string
    passwordConfirmation: string
  }
  export type Result = AccountModel
}
