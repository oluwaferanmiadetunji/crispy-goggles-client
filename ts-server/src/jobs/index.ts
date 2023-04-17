import { Queue, Job, Worker } from 'bullmq'
import { client as connection } from '../config/redis.config'
import logger from '../config/logger.config'
import { QUEUE_ACTIONS, QueueJob } from '../types/jobs.types'
import { generateRandomString } from '../utils/helpers.utils'
import workerHandler from './workers.jobs'

export const JobQueue = new Queue('Jobs', { connection })

export const addToQueue = <T extends unknown>(
  action: QUEUE_ACTIONS,
  data: T,
): void => {
  const jobId = generateRandomString(20)

  JobQueue.add(action, data, {
    attempts: 3,
    jobId,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  })

  logger.info(`Job ${jobId} created`)

  new Worker('Jobs', workerHandler, { connection })
}
