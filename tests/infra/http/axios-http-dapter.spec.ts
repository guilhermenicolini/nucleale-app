import { AxiosHttpAdapter } from '@/infra'
import { mockHttpRequest } from '@/tests/data/mocks'
import axios from 'axios'
import { mockAxios, mockHttpRequestError, mockHttpResponseError, mockFileHeaders, mockHttpArrayBufferError } from '@/tests/infra/mocks'
import faker from 'faker'

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
      responseType: request.responseType,
      data: request.body,
      headers: request.headers
    })
  })

  test('Should call axios with response type json as default', async () => {
    const request = mockHttpRequest()
    request.responseType = null
    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      responseType: 'json',
      data: request.body,
      headers: request.headers
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

  describe('file()', () => {
    test('Should return correct file response', async () => {
      const { sut, mockedAxios } = makeSut()
      const mimeType = faker.system.mimeType()
      const name = faker.system.fileName()
      const headers = mockFileHeaders(mimeType, name)

      mockedAxios.request.mockResolvedValueOnce({
        headers,
        response: {
          statusCode: 200
        }
      })
      const result = await sut.request(mockHttpRequest())

      expect(result.file).toEqual({
        mimeType,
        name
      })
    })

    test('Should return correct arraybuffer response error', async () => {
      const { sut, mockedAxios } = makeSut()
      const errorMessage = faker.random.words(2)
      const errorResponse = mockHttpArrayBufferError(errorMessage)

      mockedAxios.request.mockRejectedValueOnce({
        response: errorResponse
      })
      const request = mockHttpRequest()
      request.responseType = 'arraybuffer'

      const result = await sut.request(request)
      expect(result).toEqual({
        statusCode: errorResponse.status,
        error: errorMessage
      })
    })

    test('Should not return with missing content-disposition', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.request.mockResolvedValueOnce({
        headers: {
          'content-type': 'any_type'
        },
        response: {
          statusCode: 200
        }
      })
      const result = await sut.request(mockHttpRequest())
      expect(result.file).toEqual(undefined)
    })

    test('Should not return invalid inline content disposition', async () => {
      const { sut, mockedAxios } = makeSut()
      const fileName = faker.system.fileName()

      mockedAxios.request.mockResolvedValueOnce({
        headers: {
          'content-disposition': `filename="${fileName}"`
        },
        response: {
          statusCode: 200
        }
      })
      const result = await sut.request(mockHttpRequest())
      expect(result.file).toEqual(undefined)
    })

    test('Should not return with missing content-type', async () => {
      const { sut, mockedAxios } = makeSut()
      const fileName = faker.system.fileName()

      mockedAxios.request.mockResolvedValueOnce({
        headers: {
          'content-disposition': `inline; filename="${fileName}"`
        },
        response: {
          statusCode: 200
        }
      })
      const result = await sut.request(mockHttpRequest())
      expect(result.file).toEqual(undefined)
    })

    test('Should not return with invalid filename format', async () => {
      const { sut, mockedAxios } = makeSut()
      const fileName = faker.system.fileName()

      mockedAxios.request.mockResolvedValueOnce({
        headers: {
          'content-disposition': `inline, fileName="${fileName}"`,
          'content-type': 'any_type'
        },
        response: {
          statusCode: 200
        }
      })
      const result = await sut.request(mockHttpRequest())
      expect(result.file).toEqual(undefined)
    })
  })
})
