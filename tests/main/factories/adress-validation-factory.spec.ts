import { makeAddressValidation } from '@/main/factories/pages'
import {
  ValidationComposite,
  RequiredFieldValidator,
  ZipValidator
} from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeAddressValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('zip'),
      new ZipValidator('zip'),
      new RequiredFieldValidator('address'),
      new RequiredFieldValidator('number'),
      new RequiredFieldValidator('district'),
      new RequiredFieldValidator('state'),
      new RequiredFieldValidator('city')
    ]))
  })
})
