import { QUEUE_ACTIONS } from '../types/jobs.types'
import logger from '../config/logger.config'

const workers = async (job: any) => {
  logger.info(`Job received: ${JSON.stringify(job)}`)

  switch (job.name) {
    case QUEUE_ACTIONS.UPDATE_LOG:
      // await updateLog(job.data)
      break

    default:
      logger.error('Unknown job')
  }
}

export default workers
