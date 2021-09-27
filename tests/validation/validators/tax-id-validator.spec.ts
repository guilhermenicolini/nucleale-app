import { TaxIdValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): TaxIdValidator => new TaxIdValidator(field)
const invalidError = new InvalidFieldError('CPF inválido')

describe('TaxIdValidator', () => {
  test('Should return falsy if field is not present', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ any_field: '' })
    expect(error).toBeFalsy()
  })

  test('Should return error if field is null', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: null })
    expect(error).toEqual(invalidError)
  })

  test('Should return error if taxId is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: '9813549203'
    })
    expect(error).toEqual(invalidError)
  })

  test('Should return an error if taxId is in black list', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: '33333333333'
    })
    expect(error).toEqual(invalidError)
  })

  test('Should return falsy if validation succeeds with CPF with % 2 > 0', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const value = '28579699029'
    const error = sut.validate({
      [field]: value
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if validation succeeds with CPF with % 2 = 0', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const value = '27723130007'
    const error = sut.validate({
      [field]: value
    })
    expect(error).toBeFalsy()
  })
})
