import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidator implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }
    return input[this.field] ? null : new RequiredFieldError()
  }
}
