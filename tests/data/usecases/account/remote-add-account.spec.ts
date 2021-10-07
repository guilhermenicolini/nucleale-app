import { HttpStatusCode } from '@/data/protocols'
import { RemoteAddAccount } from '@/data/usecases'
import { ClientError, ServerError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.created)
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const params = mockAddAccountParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.add(params)
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
    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 409', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.conflict,
      error: 'any_error'
    }
    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return AccountModel on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(httpClientSpy.result.body)
  })
})
