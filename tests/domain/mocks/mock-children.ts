import { Genders } from '@/domain/models'
import { SaveChildren } from '@/domain/usecases'
import faker from 'faker'

export const mockChildrenData = (): SaveChildren.Data => ({
  name: faker.name.findName(),
  birth: faker.date.past(1).valueOf(),
  gender: faker.random.arrayElement(Genders).value
})
