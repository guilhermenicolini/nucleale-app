import { EmailValidator } from '@/validation/validators'
import { EmailValidationSpy } from '@/tests/validation/mocks'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidator
  emailValidationSpy: EmailValidationSpy
}

const makeSut = (field: string): SutTypes => {
  const emailValidationSpy = new EmailValidationSpy()
  const sut = new EmailValidator(field, emailValidationSpy)
  return {
    sut,
    emailValidationSpy
  }
}

describe('EmailValidator', () => {
  test('Should return falsy if field is not present', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ any_field: '' })
    expect(error).toBeFalsy()
  })

  test('Should call EmailValidation with correct value', () => {
    const field = faker.database.column()
    const email = faker.internet.email()
    const { sut, emailValidationSpy } = makeSut(field)
    sut.validate({ [field]: email })
    expect(emailValidationSpy.email).toBe(email)
  })

  test('Should return error if field is invalid', () => {
    const field = faker.database.column()
    const { sut, emailValidationSpy } = makeSut(field)
    emailValidationSpy.isEmailValid = false
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('E-mail inválido'))
  })

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })
})
