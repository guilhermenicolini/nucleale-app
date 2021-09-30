import { makeChangePasswordValidation } from '@/main/factories/pages'
import {
  ValidationComposite,
  RequiredFieldValidator,
  PasswordValidator,
  SameAsFieldValidator
} from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeChangePasswordValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('password'),
      new PasswordValidator('password'),
      new RequiredFieldValidator('passwordConfirmation'),
      new SameAsFieldValidator('passwordConfirmation', 'password', 'Senhas devem ser iguais')
    ]))
  })
})
