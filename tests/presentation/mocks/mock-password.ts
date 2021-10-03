import { CheckPasswordRequest, UpdatePassword } from '@/domain/usecases'

export class CheckPasswordRequestSpy implements CheckPasswordRequest {
  result: boolean = true

  async check (): Promise<boolean> {
    return this.result
  }
}

export class UpdatePasswordSpy implements UpdatePassword {
  params: UpdatePassword.Params

  async update (params: UpdatePassword.Params): Promise<void> {
    this.params = params
  }
}
