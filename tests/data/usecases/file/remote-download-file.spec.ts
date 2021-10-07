import { HttpStatusCode } from '@/data/protocols'
import { RemoteDownloadFile } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockFileResponse } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteDownloadFile
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url(), mimeType = faker.system.mimeType()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteDownloadFile(url, httpClientSpy, mimeType)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDownloadFile Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.download()
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
    const promise = sut.download()
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.download()
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const promise = sut.download()
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.download()
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return file on success', async () => {
    const mimeType = faker.system.mimeType()
    const { sut, httpClientSpy } = makeSut(null, mimeType)
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: mockFileResponse(mimeType)
    }

    const file = await sut.download()
    expect(file).toEqual(httpClientSpy.result.body)
  })
})
