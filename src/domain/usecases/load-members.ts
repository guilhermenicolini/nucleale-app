import { MemberModel } from '@/domain/models'

export interface LoadMembers {
  loadAll: () => Promise<LoadMembers.Model>
}

export namespace LoadMembers {
  export type Model = MemberModel[]
}
