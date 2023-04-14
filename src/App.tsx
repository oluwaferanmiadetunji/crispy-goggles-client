import {lazy} from "react"
import {createBrowserRouter} from "react-router-dom"
import {ROUTES} from "utils/constants"
import ErrorPage from "pages/error"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const Home = lazy(() => import("pages/home"))
const Login = lazy(() => import("pages/login"))
const Signup = lazy(() => import("pages/signup"))
const ForgotPassword = lazy(() => import("pages/forgot-password"))
const Messages = lazy(() => import("pages/messages"))
const Notifications = lazy(() => import("pages/notifications"))
const Profile = lazy(() => import("pages/profile"))
const Settings = lazy(() => import("pages/settings"))
const Bookmarks = lazy(() => import("pages/bookmarks"))

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
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.MESSAGES,
    element: <Messages />,
  },
  {
    path: ROUTES.NOTIFICATIONS,
    element: <Notifications />,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <Settings />,
  },
  {
    path: ROUTES.BOOKMARKS,
    element: <Bookmarks />,
  },
])

export default App
