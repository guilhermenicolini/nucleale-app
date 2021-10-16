import { HttpStatusCode } from '@/data/protocols'
import { RemoteDeleteChildren } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteDeleteChildren
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.noContent)
  const sut = new RemoteDeleteChildren(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDeleteChildren Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.delete(faker.datatype.uuid())
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'delete'
    })
  })

  test('Should replace :id in url on HttpClient', async () => {
    const url = `${faker.internet.url()}/:id`
    const id = faker.datatype.uuid()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.delete(id)
    expect(httpClientSpy.data.url).toBe(url.replace(':id', id))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.delete(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.delete(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ClientError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const promise = sut.delete(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.delete(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.delete(faker.datatype.uuid())
    expect(result).toBeFalsy()
  })
})
