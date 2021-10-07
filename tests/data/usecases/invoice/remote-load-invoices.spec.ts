import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadInvoices } from '@/data/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockInvoiceItem } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadInvoices
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteLoadInvoices(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadInvoices Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
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
    const promise = sut.loadAll()
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.loadAll()
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return invoice list on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: [mockInvoiceItem(), mockInvoiceItem()]
    }

    const invoices = await sut.loadAll()
    expect(invoices).toEqual(httpClientSpy.result.body)
  })

  test('Should return empty invoice list on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: null
    }

    const invoices = await sut.loadAll()
    expect(invoices).toEqual([])
  })
})
