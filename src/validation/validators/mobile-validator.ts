import { FieldValidation, MobileValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MobileValidator implements FieldValidation {
  constructor (
    readonly field: string,
    readonly mobileValidation: MobileValidation
  ) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }
    const isValid = this.mobileValidation.isValid(input[this.field])
    return isValid ? null : new InvalidFieldError('Celular inválido')
  }
}
