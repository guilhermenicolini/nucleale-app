import { RemoteAuthentication } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication,
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const params = mockAuthenticationParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.auth(params)
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'post',
      body: params
    })
  })
})
