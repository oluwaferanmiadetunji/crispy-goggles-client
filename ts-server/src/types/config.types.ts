export type ConfigTypes = {
  port: number
  env: string
  db: {
    url: string
  }
  redis: {
    url: string
  }
  jwt: {
    secret: string
  }
  clientURL: string
}
