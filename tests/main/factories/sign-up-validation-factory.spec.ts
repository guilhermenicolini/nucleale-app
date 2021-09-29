import { makeSignUpValidation } from '@/main/factories/pages'
import {
  ValidationComposite,
  RequiredFieldValidator,
  EmailValidator,
  MobileValidator,
  TaxIdValidator,
  PasswordValidator,
  SameAsFieldValidator,
  DialCodeValidator,
  MinLengthValidator
} from '@/validation/validators'
import { EmailValidationAdapter, MobileValidationAdapter } from '@/infra/validations'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('taxId'),
      new TaxIdValidator('taxId'),
      new RequiredFieldValidator('name'),
      new MinLengthValidator('name', 5),
      new RequiredFieldValidator('email'),
      new EmailValidator('email', new EmailValidationAdapter()),
      new RequiredFieldValidator('mobilePhone'),
      new DialCodeValidator('mobilePhone'),
      new MobileValidator('mobilePhone', new MobileValidationAdapter()),
      new RequiredFieldValidator('birth'),
      new RequiredFieldValidator('password'),
      new PasswordValidator('password'),
      new RequiredFieldValidator('passwordConfirmation'),
      new SameAsFieldValidator('passwordConfirmation', 'password', 'Senhas devem ser iguais')
    ]))
  })
})
