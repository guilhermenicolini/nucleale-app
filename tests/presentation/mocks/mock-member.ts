import { LoadMembers } from '@/domain/usecases'
import { mockMemberModel } from '@/tests/data/mocks'

export class LoadMembersSpy implements LoadMembers {
  calls = 0
  result: LoadMembers.Model = [mockMemberModel(), mockMemberModel()]

  async loadAll (): Promise<LoadMembers.Model> {
    this.calls++
    return this.result
  }
}
