import { HttpStatusCode } from '@/data/protocols'
import { RemoteCheckPasswordRequest } from '@/data/usecases'
import { ServerError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteCheckPasswordRequest
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteCheckPasswordRequest(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteCheckPasswordRequest Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const token = faker.datatype.uuid()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.check(token)
    expect(httpClientSpy.data).toEqual({
      url: `${url}/${token}`,
      method: 'get'
    })
  })

  test('Should return false if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const result = await sut.check(faker.datatype.uuid())
    expect(result).toBe(false)
  })

  test('Should return false if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound,
      error: 'any_error'
    }
    const result = await sut.check(faker.datatype.uuid())
    expect(result).toBe(false)
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.check(faker.datatype.uuid())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const result = await sut.check(faker.datatype.uuid())
    expect(result).toBe(true)
  })
})
