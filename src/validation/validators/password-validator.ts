import { Validation } from '@/presentation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class PasswordValidator implements Validation {
  constructor (readonly field: string) {}

  validate (input: any): Error {
    if (input[this.field] === undefined) {
      return null
    }

    const value = input[this.field] || ''
    if (value.length < 8) return new InvalidFieldError('Senha deve ter pelo menos 8 caracteres')
    if (!/[a-z]/.test(value)) return new InvalidFieldError('Senha deve ter pelo menos 1 letra minúscula')
    if (!/[A-Z]/.test(value)) return new InvalidFieldError('Senha deve ter pelo menos 1 letra maiúscula')
    if (!/[0-9]/.test(value)) return new InvalidFieldError('Senha deve ter pelo menos 1 número')
  }
}
