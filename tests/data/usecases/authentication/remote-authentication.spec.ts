import { HttpStatusCode } from '@/data/protocols'
import { RemoteAuthentication } from '@/data/usecases'
import { ClientError, ServerError } from '@/presentation/errors'
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

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return AccountModel on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const account = await sut.auth(mockAuthenticationParams())
    expect(account).toEqual(httpClientSpy.result.body)
  })
})
