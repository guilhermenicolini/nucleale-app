import { EmailValidation, FieldValidation, MobileValidation } from '@/validation/protocols'

export class EmailValidationSpy implements EmailValidation {
  isEmailValid = true
  email: string

  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor (readonly field: string) {}

  validate (input: object): Error {
    return this.error
  }
}

export class MobileValidationSpy implements MobileValidation {
  isMobileValid = true
  mobilePhone: string

  isValid (mobilePhone: string): boolean {
    this.mobilePhone = mobilePhone
    return this.isMobileValid
  }
}
