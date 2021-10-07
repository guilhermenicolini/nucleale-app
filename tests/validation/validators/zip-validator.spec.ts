import { ZipValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): ZipValidator => new ZipValidator(field)

describe('ZipValidator', () => {
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
    expect(error).toEqual(new InvalidFieldError('CEP inválido'))
  })

  test('Should return error if field has not 8 numbers > 1', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('CEP inválido'))
  })

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.address.zipCode('#####-###') })
    expect(error).toBeFalsy()
  })
})
