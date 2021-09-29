import { AddAccount, RecoverAccount } from '@/domain/usecases'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccountSpy.Params = null
  result: AddAccountSpy.Result = {
    accessToken: faker.datatype.uuid()
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export namespace AddAccountSpy {
  export type Params = AddAccount.Params
  export type Result = AddAccount.Result
}

export class RecoverAccountSpy implements RecoverAccount {
  email: string = null

  async recover (email: string): Promise<void> {
    this.email = email
  }
}
