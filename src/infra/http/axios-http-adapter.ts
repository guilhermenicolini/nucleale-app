import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'
import { Buffer } from 'buffer'

import axios, { AxiosResponse } from 'axios'

const getFile = (headers: any = {}): any => {
  const disposition = headers['content-disposition']
  if (disposition && disposition.indexOf('inline') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)

    const mimeType = headers['content-type']
    const name = matches?.length === 3 ? matches[1].replace(/['"]/g, '') : undefined

    return mimeType && name ? { mimeType, name } : undefined
  }
}

export class AxiosHttpAdapter implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        responseType: data.responseType || 'json',
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      if (error.response) {
        const err = data.responseType === 'arraybuffer' ? JSON.parse(Buffer.from(error.response.data).toString()).error : error.response.data.error
        return {
          statusCode: error.response.status,
          error: err
        }
      }
      if (error.request) {
        return {
          statusCode: error.request.status
        }
      }
      return {
        statusCode: 500
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
      file: getFile(axiosResponse.headers)
    }
  }
}
