import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import httpStatus from 'http-status'
import { ErrorLogger, SuccessLogger } from './config/morgan.config'
import Routes from './routes/index.routes'
import ApiError from './middleware/ApiError.middleware'
import RateLimiter from './middleware/RateLimiter.middleware'
import ErrorConverter from './middleware/ErrorConverter.middleware'
import ErrorHandler from './middleware/ErrorHandler.middleware'
import hpp from 'hpp'
import responseTime from 'response-time'
import { restResponseTimeHistogram } from './config/metrics.config'
import {
  ExpressAdapter,
  createBullBoard,
  BullMQAdapter,
} from '@bull-board/express'
import { JobQueue } from './jobs'

const app: Express = express()
const serverAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullMQAdapter(JobQueue)],
  serverAdapter: serverAdapter,
})

serverAdapter.setBasePath('/admin')

app.use(SuccessLogger)
app.use(ErrorLogger)

// Disable etag and x-powered-by to improve server performance
app.disable('etag').disable('x-powered-by')

// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy')

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors())

// gzip compression
app.use(compression())

// Set security headers with helmet middleware
app.use(helmet())

app.use(RateLimiter)

app.use(hpp())

// Transforms the raw string of req.body into json
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: false }))

app.use('/admin', serverAdapter.getRouter())

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000,
      )
    }
  }),
)

// Index route
app.get('/', (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json({
    message: `${req.ip}: Welcome`,
  })
})

app.use('/', Routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(ErrorConverter)

app.use(ErrorHandler)

export default app
