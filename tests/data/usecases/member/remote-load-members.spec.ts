import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadMembers } from '@/data/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy, mockMemberModel } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadMembers
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteLoadMembers(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadMembers Usecase', () => {
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

  test('Should return members on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: [mockMemberModel(), mockMemberModel()]
    }

    const members = await sut.loadAll()
    expect(members).toEqual(httpClientSpy.result.body)
  })

  test('Should return empty list on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: null
    }

    const members = await sut.loadAll()
    expect(members).toEqual([])
  })
})
