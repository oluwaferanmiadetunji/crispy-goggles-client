import { Request, Response, NextFunction } from 'express'

import { ParsedQs } from 'qs'

const CatchAsync = (
  fn: (
    arg0: Request<any, any, any, ParsedQs, Record<string, any>> | any,
    arg1: Response<any, Record<string, any>>,
    arg2: NextFunction,
  ) => any,
) => (req: Request | any, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

export default CatchAsync
