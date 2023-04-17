import IORedis from 'ioredis'
import config from './index.config'
import logger from './logger.config'
import { convertDurationToSeconds } from '../utils/helpers.utils'

const {
  redis: { url },
} = config

export const client = new IORedis(url)

const redisClient = async (): Promise<any> => {
  client.on('error', (err: any) =>
    logger.error(`Redis Client Error', ${JSON.stringify(err)}`),
  )
  await client.set('connection', '-- 🛵 Redis connection successful')

  return client
}

export default redisClient

export const getCache = async (key: string) => {
  let data = null
  const cacheData = await client.get(key)
  if (cacheData) data = JSON.parse(cacheData)

  return data
}

export const setCache = async (key: string, data: any, exp = '1D') => {
  const expiryTime = convertDurationToSeconds(exp)

  await client.set(key, JSON.stringify(data))
  await client.expire(key, expiryTime)
}
