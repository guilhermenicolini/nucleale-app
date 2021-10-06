import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadAddress } from '@/data/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockAddressModel } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadAddress
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteLoadAddress(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadAddress Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.load()
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'get'
    })
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.load()
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.load()
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return address on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: mockAddressModel()
    }

    const invoices = await sut.load()
    expect(invoices).toEqual(httpClientSpy.result.body)
  })
})
