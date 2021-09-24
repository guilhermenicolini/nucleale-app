import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  result: Error = null

  constructor (private readonly field: string) {}

  validate (field: string, input: object): Error {
    return this.field === field ? this.result : null
  }
}
