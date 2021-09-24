import { makeLoginValidation } from '@/main/factories/pages'
import { ValidationComposite, RequiredFieldValidator, EmailValidator, PasswordValidator } from '@/validation/validators'
import { EmailValidationAdapter } from '@/infra/validations'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('email'),
      new EmailValidator('email', new EmailValidationAdapter()),
      new RequiredFieldValidator('password'),
      new PasswordValidator('password')
    ]))
  })
})
