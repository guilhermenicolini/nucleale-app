import { MobileValidator } from '@/validation/validators'
import { MobileValidationSpy } from '@/tests/validation/mocks'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

type SutTypes = {
  sut: MobileValidator
  mobileValidationSpy: MobileValidationSpy
}

const makeSut = (field: string): SutTypes => {
  const mobileValidationSpy = new MobileValidationSpy()
  const sut = new MobileValidator(field, mobileValidationSpy)
  return {
    sut,
    mobileValidationSpy
  }
}

describe('MobileValidator', () => {
  test('Should return falsy if field is not present', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ any_field: '' })
    expect(error).toBeFalsy()
  })

  test('Should call MobileValidation with correct value', () => {
    const field = faker.database.column()
    const mobilePhone = faker.phone.phoneNumber()
    const { sut, mobileValidationSpy } = makeSut(field)
    sut.validate({ [field]: mobilePhone })
    expect(mobileValidationSpy.mobilePhone).toBe(mobilePhone)
  })

  test('Should return error if field is invalid', () => {
    const field = faker.database.column()
    const { sut, mobileValidationSpy } = makeSut(field)
    mobileValidationSpy.isMobileValid = false
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('Celular inválido'))
  })

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.phone.phoneNumber() })
    expect(error).toBeFalsy()
  })
})
