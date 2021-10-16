import { LoadChildrens, SaveChildren, DeleteChildren } from '@/domain/usecases'
import { mockChildrenModel } from '@/tests/data/mocks'
import faker from 'faker'

export class LoadChildrensSpy implements LoadChildrens {
  calls = 0
  result: LoadChildrens.Model = [mockChildrenModel(), mockChildrenModel()]

  async loadAll (): Promise<LoadChildrens.Model> {
    this.calls++
    return this.result
  }
}

export class SaveChildrenSpy implements SaveChildren {
  calls = 0
  data: SaveChildren.Data
  result: SaveChildren.Result = faker.datatype.uuid()

  async save (data: SaveChildren.Data): Promise<SaveChildren.Result> {
    this.calls++
    this.data = data
    return this.result
  }
}

export class DeleteChildrenSpy implements DeleteChildren {
  calls = 0
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
    this.calls++
  }
}
