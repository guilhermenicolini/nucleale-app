import { ValidationBuilder as sut, RequiredFieldValidator, EmailValidator, PasswordValidator } from '@/validation/validators'
import { EmailValidationAdapter } from '@/infra/validations'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidator(field)])
  })

  test('Should return EmailValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidator(field, new EmailValidationAdapter())])
  })

  test('Should return PasswordValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).password().build()
    expect(validations).toEqual([new PasswordValidator(field)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().password().build()
    expect(validations).toEqual([
      new RequiredFieldValidator(field),
      new PasswordValidator(field)
    ])
  })
})
