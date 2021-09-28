import { FieldValidation } from '@/validation/protocols'
import {
  RequiredFieldValidator,
  EmailValidator,
  PasswordValidator,
  TaxIdValidator,
  SameAsFieldValidation
} from '@/validation/validators'
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

  cpf (): ValidationBuilder {
    this.validations.push(new TaxIdValidator(this.field))
    return this
  }

  sameAs (fieldToCompare: string, message?: string): ValidationBuilder {
    this.validations.push(new SameAsFieldValidation(this.field, fieldToCompare, message))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
