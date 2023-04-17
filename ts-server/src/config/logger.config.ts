import winston from 'winston'

const infoLogger = winston.createLogger({
  defaultMeta: { service: 'info-log-service' },
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `src/logs/log.log`,
      handleExceptions: false,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.Console(),
  ],
})

const errorLogger = winston.createLogger({
  defaultMeta: { service: 'error-log-service' },
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `src/logs/error.log`,
      handleExceptions: false,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.Console(),
  ],
})

const sillyLogger = winston.createLogger({
  defaultMeta: { service: 'silly-log-service' },
  transports: [new winston.transports.Console()],
})

const logger = {
  info: (params: any) => {
    return infoLogger.info(params)
  },
  error: (params: any) => {
    return errorLogger.error(params)
  },
  silly: (params: any) => {
    return sillyLogger.info(params)
  },
}

export default logger
