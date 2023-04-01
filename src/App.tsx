import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import ErrorPage from 'pages/error'

const Home = lazy(() => import('pages/home'))
const Login = lazy(() => import('pages/login'))
const Signup = lazy(() => import('pages/signup'))

const App = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
])

export default App
