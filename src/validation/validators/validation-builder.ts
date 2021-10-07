import { FieldValidation } from '@/validation/protocols'
import {
  RequiredFieldValidator,
  EmailValidator,
  PasswordValidator,
  TaxIdValidator,
  SameAsFieldValidator,
  MobileValidator,
  DialCodeValidator,
  MinLengthValidator,
  ZipValidator
} from '@/validation/validators'
import { EmailValidationAdapter, MobileValidationAdapter } from '@/infra/validations'

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
    this.validations.push(new SameAsFieldValidator(this.field, fieldToCompare, message))
    return this
  }

  mobile (): ValidationBuilder {
    this.validations.push(new MobileValidator(this.field, new MobileValidationAdapter()))
    return this
  }

  dial (): ValidationBuilder {
    this.validations.push(new DialCodeValidator(this.field))
    return this
  }

  min (minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidator(this.field, minLength))
    return this
  }

  zip (): ValidationBuilder {
    this.validations.push(new ZipValidator(this.field))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
