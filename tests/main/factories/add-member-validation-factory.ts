import { makeAddMemberValidation } from '@/main/factories/pages'
import { ValidationComposite, RequiredFieldValidator, EmailValidator } from '@/validation/validators'
import { EmailValidationAdapter } from '@/infra/validations'

describe('AddMemberValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeAddMemberValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('email'),
      new EmailValidator('email', new EmailValidationAdapter())
    ]))
  })
})
