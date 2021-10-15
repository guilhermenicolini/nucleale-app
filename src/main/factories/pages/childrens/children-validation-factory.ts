import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeChildrenValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('birth').required().build(),
    ...Builder.field('gender').required().build()
  ])
}
