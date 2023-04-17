import { ConfigTypes } from '../types/config.types'
import dotenv from 'dotenv'
dotenv.config()

const ConfigOptions: ConfigTypes = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000'),
  db: {
    url: process.env.URI || '',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  clientURL: process.env.clientURL || '',
}

export default ConfigOptions
