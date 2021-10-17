import { LoadMembers, InviteMember } from '@/domain/usecases'
import { mockMemberModel } from '@/tests/data/mocks'

export class LoadMembersSpy implements LoadMembers {
  calls = 0
  result: LoadMembers.Model = [mockMemberModel(), mockMemberModel()]

  async loadAll (): Promise<LoadMembers.Model> {
    this.calls++
    return this.result
  }
}

export class InviteMemberSpy implements InviteMember {
  email: string
  calls = 0

  async invite (email: string): Promise<void> {
    this.calls++
    this.email = email
  }
}
