import {
  ValidationBuilder as sut,
  RequiredFieldValidator,
  EmailValidator,
  PasswordValidator,
  TaxIdValidator,
  SameAsFieldValidator,
  MobileValidator,
  DialCodeValidator,
  MinLengthValidator,
  ZipValidator
} from '@/validation/validators'
import { EmailValidationAdapter, MobileValidationAdapter } from '@/infra/validations'
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

  test('Should return TaxIdValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).cpf().build()
    expect(validations).toEqual([new TaxIdValidator(field)])
  })

  test('Should return SameAsFieldValidator', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new SameAsFieldValidator(field, fieldToCompare)])
  })

  test('Should return MobileValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).mobile().build()
    expect(validations).toEqual([new MobileValidator(field, new MobileValidationAdapter())])
  })

  test('Should return DialCodeValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).dial().build()
    expect(validations).toEqual([new DialCodeValidator(field)])
  })

  test('Should return MinLengthValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).min(5).build()
    expect(validations).toEqual([new MinLengthValidator(field, 5)])
  })

  test('Should return ZipValidator', () => {
    const field = faker.database.column()
    const validations = sut.field(field).zip().build()
    expect(validations).toEqual([new ZipValidator(field)])
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
