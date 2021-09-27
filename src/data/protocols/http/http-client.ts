export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  conflict = 409,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  error?: string
  body?: T
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
