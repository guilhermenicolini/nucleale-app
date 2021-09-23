import { EmailValidation } from '@/validation/protocols'

export class EmailValidationSpy implements EmailValidation {
  isEmailValid = true
  email: string

  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}
