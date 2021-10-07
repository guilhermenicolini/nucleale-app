import { DownloadFile } from '@/domain/usecases'
import { mockFileResponse } from '@/tests/data/mocks'

export class DownloadFileSpy implements DownloadFile {
  calls = 0
  id: string
  result: DownloadFile.Model = mockFileResponse()

  async download (id: string): Promise<DownloadFile.Model> {
    this.id = id
    this.calls++
    return this.result
  }
}
