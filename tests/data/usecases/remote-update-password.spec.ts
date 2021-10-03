import { HttpStatusCode } from '@/data/protocols'
import { RemoteUpdatePassword } from '@/data/usecases'
import { ClientError, ServerError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockUpdatePasswordParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteUpdatePassword
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.noContent)
  const sut = new RemoteUpdatePassword(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteUpdatePassword Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const params = mockUpdatePasswordParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.update(params)
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
    const promise = sut.update(mockUpdatePasswordParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const promise = sut.update(mockUpdatePasswordParams())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.update(mockUpdatePasswordParams())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.update(mockUpdatePasswordParams())
    expect(result).toBeFalsy()
  })
})
