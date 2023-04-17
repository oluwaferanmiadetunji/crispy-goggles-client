import { Router } from 'express'
import * as userController from '../controller/user.controller'
import Validate from '../middleware/Validate.middleware'
import * as userSchema from '../schema/user.schema'
import auth from '../middleware/auth.middleware'

const router = Router()

router.post(
  '/seed',
  Validate(userSchema.GenerateUserSchema),
  userController.generateUsers,
)

export default router
