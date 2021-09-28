import { AxiosHttpAdapter } from '@/infra'
import { mockHttpRequest } from '@/tests/data/mocks'
import axios from 'axios'
import { mockAxios, mockHttpRequestError, mockHttpResponseError } from '@/tests/infra/mocks'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxioHttpClient Adapter', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct response error', async () => {
    const { sut, mockedAxios } = makeSut()
    const errorResponse = mockHttpResponseError()

    mockedAxios.request.mockRejectedValueOnce({
      response: errorResponse
    })

    const result = await sut.request(mockHttpRequest())
    expect(result).toEqual({
      statusCode: errorResponse.status,
      error: errorResponse.data.error
    })
  })

  test('Should return correct request error', async () => {
    const { sut, mockedAxios } = makeSut()
    const errorResponse = mockHttpRequestError()

    mockedAxios.request.mockRejectedValueOnce({
      request: errorResponse
    })

    const result = await sut.request(mockHttpRequest())
    expect(result).toEqual({
      statusCode: errorResponse.status
    })
  })

  test('Should return correct unhandled error', async () => {
    const { sut, mockedAxios } = makeSut()

    mockedAxios.request.mockRejectedValueOnce({})

    const result = await sut.request(mockHttpRequest())
    expect(result).toEqual({
      statusCode: 500
    })
  })
})
