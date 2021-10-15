import { SameAsFieldValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): SameAsFieldValidator => new SameAsFieldValidator(field, fieldToCompare, null)

describe('SameAsFieldValidator', () => {
  test('Should return falsy if field is not present', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ any_field: '' })
    expect(error).toBeFalsy()
  })

  test('Should return error if field is null', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: null, [fieldToCompare]: 'other_Value' })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error if compare is invalid', () => {
    const sut = makeSut('field1', 'field2')
    const error = sut.validate({
      field1: 'any_value',
      field2: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
