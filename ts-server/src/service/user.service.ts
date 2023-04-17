import ApiError from '../middleware/ApiError.middleware'
import httpStatus from 'http-status'
import logger from '../config/logger.config'
import { UserType } from '../types/users.types'
import UserModel from '../models/user.model'
import { generateRandomString } from '../utils/helpers.utils'

export const createUser = async (data: Partial<UserType>) => {
  try {
    logger.info(`Adding user to DB`)

    const user = await UserModel.create({
      ...data,
      _id: generateRandomString(8),
    })

    logger.info('User added successfully ')
    return user
  } catch (e) {
    logger.error(`Error adding user to db ${JSON.stringify(e)}`)
    throw new ApiError(
      httpStatus.CONFLICT,
      `Error adding user to db ${JSON.stringify(e)}`,
    )
  }
}

export const updateUser = async (_id: string, payload: Partial<UserType>) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        _id,
      },
      {
        ...payload,
      },
      { new: true },
    )

    return user
  } catch (e) {
    logger.error(`Error updating user on db ${JSON.stringify(e)}`)
    throw new ApiError(
      httpStatus.CONFLICT,
      `Error updating user on db ${JSON.stringify(e)}`,
    )
  }
}

export const getUserByID = async (id: string) => {
  try {
    const user = await UserModel.findById(id)

    return user
  } catch (e) {
    logger.error(`Error fetching user: ${id} on db ${JSON.stringify(e)}`)
    throw new ApiError(
      httpStatus.CONFLICT,
      `Error fetching user: ${id} on db ${JSON.stringify(e)}`,
    )
  }
}
