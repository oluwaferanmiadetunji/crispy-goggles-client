import { Router } from 'express'
import usersRoutes from './users.routes'

const router = Router()

const AppRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
]

AppRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
