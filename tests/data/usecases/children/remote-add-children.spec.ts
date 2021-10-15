import { HttpStatusCode } from '@/data/protocols'
import { RemoteAddChildren } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockChildrenData } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddChildren
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.created)
  const sut = new RemoteAddChildren(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddChildren Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const data = mockChildrenData()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.save(data)
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'post',
      body: data
    })
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.save(mockChildrenData())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.save(mockChildrenData())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.save(mockChildrenData())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return created children id on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result.body = { id: faker.datatype.uuid() }
    const id = await sut.save(mockChildrenData())
    expect(id).toEqual(httpClientSpy.result.body.id)
  })
})
