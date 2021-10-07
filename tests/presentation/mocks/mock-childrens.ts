import { LoadChildrens } from '@/domain/usecases'
import { mockChildrenModel } from '@/tests/data/mocks'

export class LoadChildrensSpy implements LoadChildrens {
  calls = 0
  result: LoadChildrens.Model = [mockChildrenModel(), mockChildrenModel()]

  async loadAll (): Promise<LoadChildrens.Model> {
    this.calls++
    return this.result
  }
}
