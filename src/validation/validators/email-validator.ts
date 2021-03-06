import { FieldValidation, EmailValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidator implements FieldValidation {
  constructor (
    readonly field: string,
    readonly emailValidation: EmailValidation
  ) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }
    const isValid = this.emailValidation.isValid(input[this.field])
    return isValid ? null : new InvalidFieldError('E-mail inválido')
  }
}
