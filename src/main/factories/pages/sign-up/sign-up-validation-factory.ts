import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('taxId').required().cpf().build(),
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('mobilePhone').required().dial().mobile().build(),
    ...Builder.field('birth').required().build(),
    ...Builder.field('password').required().password().build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password', 'Senhas devem ser iguais').build()
  ])
}
