import { FieldValidation } from '@/validation/protocols'
import { isValidDialCode } from '@/validation/utils'
import { InvalidFieldError } from '@/validation/errors'

export class DialCodeValidator implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }

    const isValid = isValidDialCode(input[this.field])
    return isValid ? null : new InvalidFieldError('Código do país inválido')
  }
}
