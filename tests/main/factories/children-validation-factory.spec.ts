import { makeChildrenValidation } from '@/main/factories/pages'
import {
  ValidationComposite,
  RequiredFieldValidator,
  MinLengthValidator
} from '@/validation/validators'

describe('ChildrenValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeChildrenValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidator('name'),
      new MinLengthValidator('name', 5),
      new RequiredFieldValidator('birth'),
      new RequiredFieldValidator('gender')
    ]))
  })
})
