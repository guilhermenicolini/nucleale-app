import { RequiredFieldValidator } from '@/validation/validators'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): RequiredFieldValidator => new RequiredFieldValidator(field)

describe('RequiredFieldValidator', () => {
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
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
