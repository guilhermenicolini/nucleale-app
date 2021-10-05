import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      if (error.response) {
        return {
          statusCode: error.response.status,
          error: error.response.data.error
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
      body: axiosResponse.data
    }
  }
}
