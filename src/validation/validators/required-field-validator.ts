import { Validation } from '@/presentation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidator implements Validation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }
    return input[this.field] ? null : new RequiredFieldError()
  }
}
