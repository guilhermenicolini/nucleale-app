import { HttpStatusCode } from '@/data/protocols'
import { RemoteFindLocation } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockFindLocationResult } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteFindLocation
  httpClientSpy: HttpClientSpy
}

const mockRequest = (): string => faker.address.zipCode('########')

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteFindLocation(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteFindLocation Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.find(mockRequest())
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'get'
    })
  })

  test('Should replace :id in url on HttpClient', async () => {
    const url = `${faker.internet.url()}/:zip`
    const zip = mockRequest()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.find(zip)
    expect(httpClientSpy.data.url).toBe(url.replace(':zip', zip))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.find(mockRequest())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.find(mockRequest())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.find(mockRequest())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return address on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: mockFindLocationResult()
    }

    const invoices = await sut.find(mockRequest())
    expect(invoices).toEqual(httpClientSpy.result.body)
  })
})
