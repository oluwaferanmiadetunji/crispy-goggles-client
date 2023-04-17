import mongoose from 'mongoose'
import config from './index.config'
import logger from './logger.config'

const { url } = config.db

mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect(url)
  } catch (error) {
    console.error(error)
    logger.silly(`Could not connect to db: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}

export default connect
