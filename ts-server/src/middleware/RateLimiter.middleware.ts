import rateLimit from 'express-rate-limit'

const RateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
})

export default RateLimiter
