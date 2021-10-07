import { ChildrenModel } from '@/domain/models'

export interface LoadChildrens {
  loadAll: () => Promise<LoadChildrens.Model>
}

export namespace LoadChildrens {
  export type Model = ChildrenModel[]
}
