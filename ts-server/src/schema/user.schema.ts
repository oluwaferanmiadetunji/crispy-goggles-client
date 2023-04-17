import Joi from 'joi'
import { customPassword } from '../utils/helpers.utils'

export const GenerateUserSchema = {
  body: Joi.object().keys({
    count: Joi.number().required(),
  }),
}
