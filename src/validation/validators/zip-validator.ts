import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class ZipValidator implements FieldValidation {
  constructor (
    readonly field: string) {}

  validate (input: any): Error {
    if (input[this.field] === undefined) {
      return null
    }

    const value = (input[this.field] || '').replace(/[^0-9]/g, '')
    return value.length !== 8 ? new InvalidFieldError('CEP inválido') : null
  }
}
