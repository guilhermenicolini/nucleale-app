export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
  responseType?: 'json' | 'arraybuffer'
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  conflict = 409,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  error?: string
  body?: T
  file?: {
    name: string
    mimeType: string
  }
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
