import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makePasswordRecoveryValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('email').required().email().build()
  ])
}
