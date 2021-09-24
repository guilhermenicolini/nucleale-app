import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  result: Error = null

  validate (field: string, input: object): Error {
    return this.result
  }
}
