import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockHttpResponseError = (): any => ({
  data: { error: faker.random.words() },
  status: faker.datatype.number()
})

export const mockHttpArrayBufferError = (error: string): any => ({
  data: Buffer.from(JSON.stringify({ error })),
  status: faker.datatype.number()
})

export const mockHttpRequestError = (): any => ({
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

export const mockFileHeaders = (mimeType: string = faker.system.mimeType(), fileName: string = faker.system.fileName()): any => ({
  'content-type': mimeType,
  'content-disposition': `inline; filename="${fileName}"`
})
