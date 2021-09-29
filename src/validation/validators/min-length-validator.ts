import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidator implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number) {}

  validate (input: any): Error {
    if (input[this.field] === undefined) {
      return null
    }

    const characters = `caracter${this.minLength > 1 ? 'es' : ''}`
    const value = input[this.field]

    return !value || input[this.field].length < this.minLength ? new InvalidFieldError(`Mínimo de ${this.minLength} ${characters} requerido`) : null
  }
}
