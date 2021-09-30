import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeChangePasswordValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('password').required().password().build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password', 'Senhas devem ser iguais').build()
  ])
}
