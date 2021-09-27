import { FieldValidation } from '@/validation/protocols'
import { isValidCpf } from '@/validation/utils'
import { InvalidFieldError } from '@/validation/errors'

export class TaxIdValidator implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (input[this.field] === undefined) {
      return null
    }

    const value = input[this.field] || ''
    if (!isValidCpf(value)) return new InvalidFieldError('CPF inválido')
  }
}
