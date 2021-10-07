import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeAddressValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('zip').required().zip().build(),
    ...Builder.field('address').required().build(),
    ...Builder.field('number').required().build(),
    ...Builder.field('district').required().build(),
    ...Builder.field('state').required().build(),
    ...Builder.field('city').required().build()
  ])
}
