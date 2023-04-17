import {
  ExpressAdapter,
  createBullBoard,
  BullMQAdapter,
} from '@bull-board/express'
import { JobQueue as queue } from './index'
import app from '../app'

const setupQueueVisualizer = async () => {
  const serverAdapter = new ExpressAdapter()

  createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter: serverAdapter,
  })

  serverAdapter.setBasePath('/admin/queues')

  app.use('/admin/queues', serverAdapter.getRouter())
}

export default setupQueueVisualizer
