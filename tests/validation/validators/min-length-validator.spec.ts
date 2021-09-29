import { MinLengthValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, minLength: number = 5): MinLengthValidator => new MinLengthValidator(field, minLength)

describe('MinLengthValidator', () => {
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
    expect(error).toEqual(new InvalidFieldError('Mínimo de 5 caracteres requerido'))
  })

  test('Should return error if field has not min length > 1', () => {
    const field = faker.database.column()
    const min = faker.datatype.number({ min: 3, max: 9 })
    const sut = makeSut(field, min)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(min - 1) })
    expect(error).toEqual(new InvalidFieldError(`Mínimo de ${min} caracteres requerido`))
  })

  test('Should return error if field has not min length = 1', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 1)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(0) })
    expect(error).toEqual(new InvalidFieldError('Mínimo de 1 caracter requerido'))
  })

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(10) })
    expect(error).toBeFalsy()
  })
})
