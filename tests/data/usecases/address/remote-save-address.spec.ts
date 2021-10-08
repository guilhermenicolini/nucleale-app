import { HttpStatusCode } from '@/data/protocols'
import { RemoteSaveAddress } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockAddressModel } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveAddress
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.noContent)
  const sut = new RemoteSaveAddress(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveAddress Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const params = mockAddressModel()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.save(params)
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
    const promise = sut.save(mockAddressModel())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.save(mockAddressModel())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.save(mockAddressModel())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.save(mockAddressModel())
    expect(result).toBeFalsy()
  })
})
