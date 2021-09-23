import { PasswordValidator } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): PasswordValidator => new PasswordValidator(field)

describe('PasswordValidator', () => {
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
    expect(error).toEqual(new InvalidFieldError('Senha deve ter pelo menos 8 caracteres'))
  })

  test('Should return error if field has less then 8 characters', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(7) })
    expect(error).toEqual(new InvalidFieldError('Senha deve ter pelo menos 8 caracteres'))
  })

  test('Should return error if field has no lowercase letters', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(8).toUpperCase() })
    expect(error).toEqual(new InvalidFieldError('Senha deve ter pelo menos 1 letra minúscula'))
  })

  test('Should return error if field has no uppercase letters', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(8).toLowerCase() })
    expect(error).toEqual(new InvalidFieldError('Senha deve ter pelo menos 1 letra maiúscula'))
  })

  test('Should return error if field has no number', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: `${faker.random.alpha({ count: 4, upcase: false })}${faker.random.alpha({ count: 4, upcase: true })}` })
    expect(error).toEqual(new InvalidFieldError('Senha deve ter pelo menos 1 número'))
  })

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: `${faker.random.alpha({ count: 4, upcase: false })}${faker.random.alpha({ count: 3, upcase: true })}${faker.datatype.number()}` })
    expect(error).toBeFalsy()
  })
})
