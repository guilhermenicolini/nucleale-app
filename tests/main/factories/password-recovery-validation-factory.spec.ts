import { makePasswordRecoveryValidation } from '@/main/factories/pages'
import { ValidationComposite, RequiredFieldValidator, EmailValidator } from '@/validation/validators'
import { EmailValidationAdapter } from '@/infra/validations'

describe('PasswordRecoveryValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makePasswordRecoveryValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('email'),
      new EmailValidator('email', new EmailValidationAdapter())
    ]))
  })
})
