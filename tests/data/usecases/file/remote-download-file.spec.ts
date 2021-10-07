import { HttpStatusCode } from '@/data/protocols'
import { RemoteDownloadFile } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockFileBuffer, mockFileResponse } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteDownloadFile
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteDownloadFile(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDownloadFile Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.download(faker.datatype.uuid())
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'get',
      responseType: 'arraybuffer'
    })
  })

  test('Should replace :id in url on HttpClient', async () => {
    const url = `${faker.internet.url()}/:id`
    const id = faker.datatype.uuid()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.download(id)
    expect(httpClientSpy.data.url).toBe(url.replace(':id', id))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.download(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.download(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const promise = sut.download(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.download(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return file on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: mockFileBuffer(),
      file: mockFileResponse()
    }

    const file = await sut.download(faker.datatype.uuid())
    expect(file.data).toEqual(httpClientSpy.result.body)
    expect(file.fileName).toBe(httpClientSpy.result.file.name)
    expect(file.mimeType).toBe(httpClientSpy.result.file.mimeType)
  })
})
