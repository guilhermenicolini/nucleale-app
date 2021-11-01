import { HttpStatusCode } from '@/data/protocols'
import { RemoteValidateCertificate } from '@/data/usecases'
import { ServerError } from '@/presentation/errors'
import { HttpClientSpy, mockValidCertificateItem } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteValidateCertificate
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(HttpStatusCode.ok)
  const sut = new RemoteValidateCertificate(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteValidateCertificate Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.validate()
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'get'
    })
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }
    const promise = sut.validate()
    expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return certificate on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body: mockValidCertificateItem
    }

    const certificate = await sut.validate()
    expect(certificate).toEqual(httpClientSpy.result.body)
  })

  test('Should return null on invalid certificate', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.result = {
      statusCode: HttpStatusCode.notFound
    }

    const certificate = await sut.validate()
    expect(certificate).toBeFalsy()
  })
})
