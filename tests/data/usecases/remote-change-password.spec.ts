import { HttpStatusCode } from '@/data/protocols'
import { RemoteChangePassword } from '@/data/usecases'
import { ClientError, ServerError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockChangePasswordParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteChangePassword
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.noContent)
  const sut = new RemoteChangePassword(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteChangePassword Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const params = mockChangePasswordParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.change(params)
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
    const promise = sut.change(mockChangePasswordParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const promise = sut.change(mockChangePasswordParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.change(mockChangePasswordParams())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toBeFalsy()
  })
})
