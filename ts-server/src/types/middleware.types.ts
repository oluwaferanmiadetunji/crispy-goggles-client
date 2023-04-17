export type ErrorType = {
  statusCode: number
  message: string | any
  stack?: string
  isOperational?: boolean
}
