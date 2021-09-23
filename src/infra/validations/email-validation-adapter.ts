import { EmailValidation } from '@/validation/protocols'

import validator from 'validator'

export class EmailValidationAdapter implements EmailValidation {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
