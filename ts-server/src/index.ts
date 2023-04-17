import config from './config/index.config'
import logger from './config/logger.config'
import server from './config/server.config'
import dbConnect from './config/db.config'
import { startMetricsServer } from './config/metrics.config'
import redisClient from './config/redis.config'

const startServer = (): void => {
  server.listen(config.port, async () => {
    logger.silly(
      `✔️  Server running in ${config.env} and listening on port ${config.port}`,
    )

    logger.info('✌️   Database connecting!')
    await dbConnect()
    logger.info('✔️   Database connected!')

    logger.info('✌️   Redis loading!')
    await redisClient()
    logger.info('✔️   Redis loaded!')

    logger.info('✌️   Metrics server loading!')
    await startMetricsServer()
  })
}

startServer()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logger.error(`Error: ${err}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})

export default server
