import { Job } from 'bullmq'

export enum QUEUES {
  LOGS = 'LOGS',
}

export enum QUEUE_ACTIONS {
  UPDATE_LOG = 'UPDATE_LOG',
}

export interface QueueJob extends Job {
  action: string
  data: any
}
