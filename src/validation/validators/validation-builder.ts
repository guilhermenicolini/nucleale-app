import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidator, EmailValidator, PasswordValidator } from '@/validation/validators'
import { EmailValidationAdapter } from '@/infra/validations'

export class ValidationBuilder {
  private constructor (
    private readonly field: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (field: string): ValidationBuilder {
    return new ValidationBuilder(field, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidator(this.field))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidator(this.field, new EmailValidationAdapter()))
    return this
  }

  password (): ValidationBuilder {
    this.validations.push(new PasswordValidator(this.field))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
