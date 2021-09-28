import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class SameAsFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly fieldToCompare: string,
    readonly message?: string
  ) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError(this.message) : null
  }
}
