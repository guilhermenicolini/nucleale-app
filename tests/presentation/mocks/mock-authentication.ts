import { Authentication } from '@/domain/usecases'
import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationSpy.Params = null
  result: AuthenticationSpy.Result = {
    accessToken: faker.datatype.uuid()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export namespace AuthenticationSpy {
  export type Params = Authentication.Params
  export type Result = Authentication.Result
}
