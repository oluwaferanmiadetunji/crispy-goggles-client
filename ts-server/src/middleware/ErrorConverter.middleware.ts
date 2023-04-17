import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import ApiError from './ApiError.middleware'
import { ErrorType } from '../types/middleware.types'
import LoggerInstance from '../config/logger.config'

const ErrorConverter = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err
  LoggerInstance.error(JSON.stringify(error))
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]

    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export default ErrorConverter
