import { MobileValidationAdapter } from '@/infra/validations'

import faker from 'faker'
import validator from 'validator'

jest.mock('validator', () => ({
  isMobilePhone (): boolean {
    return true
  }
}))

const makeSut = (): MobileValidationAdapter => new MobileValidationAdapter()

describe('MobileValidation Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.random.word())
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.phone.phoneNumber())
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct mobile phone', () => {
    const sut = makeSut()
    const mobilePhone = faker.phone.phoneNumber()
    const isMobilePhoneSpy = jest.spyOn(validator, 'isMobilePhone')
    sut.isValid(mobilePhone)
    expect(isMobilePhoneSpy).toHaveBeenCalledWith(mobilePhone, 'any', { strictMode: true })
  })
})
