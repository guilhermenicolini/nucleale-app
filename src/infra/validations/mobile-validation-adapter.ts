import { MobileValidation } from '@/validation/protocols'

import validator from 'validator'

export class MobileValidationAdapter implements MobileValidation {
  isValid (mobilePhone: string): boolean {
    return validator.isMobilePhone(mobilePhone, 'any', {
      strictMode: true
    })
  }
}
