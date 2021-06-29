import { AxiosHttpAdapter } from '@/infra'
import { mockHttpRequest } from '@/tests/data/mocks'
import axios from 'axios'
import { mockAxios } from '@/tests/infra/mocks'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpAdapter,
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
})
