import { FindLocation } from '@/domain/usecases'
import { mockFindLocationResult } from '@/tests/data/mocks'

export class FindLocationSpy implements FindLocation {
  zip: string
  calls = 0
  result: FindLocation.Model = mockFindLocationResult()

  async find (zip: string): Promise<FindLocation.Model> {
    this.calls++
    this.zip = zip
    return this.result
  }
}
