import { Request, Response, NextFunction } from 'express'
import config from '../config/index.config'
import LoggerInstance from '../config/logger.config'
import { ErrorType } from '../types/middleware.types'

const ErrorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { statusCode, message } = err

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  LoggerInstance.error(JSON.stringify(err))

  res.status(statusCode).send(response)
}

export default ErrorHandler
