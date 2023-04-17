import { Request, Response } from 'express'
import morgan from 'morgan'
import logger from './logger.config'

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || '',
)

const successResponseFormat = `:remote-addr - :method :url :status - :response-time ms`

const errorResponseFormat = `:remote-addr - :method :url :status - :response-time ms - message: :message`

export const SuccessLogger = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
})

export const ErrorLogger = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 517,
  stream: { write: (message: string) => logger.error(message.trim()) },
})
