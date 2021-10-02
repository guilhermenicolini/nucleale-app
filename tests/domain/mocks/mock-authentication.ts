import { Authentication, AddAccount, ChangePassword } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(8)
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  mobilePhone: faker.phone.phoneNumber(),
  birth: faker.date.past(30).valueOf(),
  password: faker.internet.password(8),
  passwordConfirmation: faker.internet.password(8)
})

export const mockChangePasswordParams = (): ChangePassword.Params => ({
  password: faker.internet.password(8),
  passwordConfirmation: faker.internet.password(8)
})
