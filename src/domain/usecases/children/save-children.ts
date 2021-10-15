import { ChildrenModel } from '@/domain/models'

export interface SaveChildren {
  save: (data: SaveChildren.Data) => Promise<SaveChildren.Result>
}

export namespace SaveChildren {
  export type Data = Omit<ChildrenModel, 'id'>
  export type Result = string
}
