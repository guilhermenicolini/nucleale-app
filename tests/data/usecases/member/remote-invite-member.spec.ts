import { HttpStatusCode } from '@/data/protocols'
import { RemoteInviteMember } from '@/data/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteInviteMember
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.noContent)
  const sut = new RemoteInviteMember(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteInviteMember Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const email = faker.internet.email()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.invite(email)
    expect(httpClientSpy.data).toEqual({
      url: `${url}/${email}`,
      method: 'post'
    })
  })

  test('Should throw ClientError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.badRequest,
      error: 'any_error'
    }
    const promise = sut.invite(faker.internet.email())
    expect(promise).rejects.toThrowError(new ClientError(httpClientSpy.result.error))
  })

  test('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }
    const promise = sut.invite(faker.internet.email())
    expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.invite(faker.internet.email())
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.invite(faker.internet.email())
    expect(result).toBeFalsy()
  })
})
