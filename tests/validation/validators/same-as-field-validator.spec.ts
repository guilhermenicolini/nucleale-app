import { SameAsFieldValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): SameAsFieldValidator => new SameAsFieldValidator(field, fieldToCompare, null)

describe('SameAsFieldValidator', () => {
  test('Should return falsy if field is not present', () => {
    const sut = makeSut('field1', 'field2')
    const error = sut.validate({ any_field: '' })
    expect(error).toBeFalsy()
  })

  test('Should return error if field is null', () => {
    const sut = makeSut('field1', 'field2')
    const error = sut.validate({ field1: null, field2: 'other_Value' })
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
    const value = faker.random.word()
    const sut = makeSut('field1', 'field2')
    const error = sut.validate({
      field1: value,
      field2: value
    })
    expect(error).toBeFalsy()
  })
})
