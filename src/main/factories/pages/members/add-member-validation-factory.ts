import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeAddMemberValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('email').required().email().build()
  ])
}
