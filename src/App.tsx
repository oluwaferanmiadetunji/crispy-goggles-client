import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

const Home = lazy(() => import('pages/home'))
const Login = lazy(() => import('pages/login'))

const App = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
])

export default App
