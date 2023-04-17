import logger from '../config/logger.config'
import httpStatus from 'http-status'
import catchAsync from '../middleware/CatchAsync.middleware'
import * as userService from '../service/user.service'
import { faker } from '@faker-js/faker'

export const generateUsers = catchAsync(async (req, res) => {
  // const authUser = req.currentUser

  const { count } = req.body

  logger.info('Attempting to get user bank details')

  try {
    for (let i = 0; i < count; i++) {
      const user = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password:
          '$2a$10$m1XVtWGS5TkH0nCvPKVVQOe68QZUfXZqvMSiKjsMLwX2wQqXiDolO',
        username: faker.internet.userName(),
        date_of_birth: new Date(faker.date.past(18)).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        friends_count: 0,
        followers_count: 0,
        bio: faker.lorem.sentences(5),
        location: faker.address.country(),
        img: faker.image.avatar(),
        header_image: faker.image.abstract(),
        links: [],
      }
      console.log(`Adding ${i + 1} of ${count} users`)
      await userService.createUser(user)
    }

    return res.status(httpStatus.OK).json({ data: 'Hi' })
  } catch (e) {
    const err = e as any
    logger.error(`Error getting user logs: ${err?.message}`)

    return res
      .status(err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error getting user logs!' })
  }
})
