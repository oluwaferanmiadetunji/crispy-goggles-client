import {useEffect} from "react"
import {saveItem} from "utils/storage"
import {Link, useLocation} from "react-router-dom"
import {ROUTES} from "utils/constants"
import {
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import Logo from "components/logo"
import {logoutUser} from "utils/helpers"
import {useAppDispatch, useAppSelector} from "components/hooks/redux"
import {setLoginStatus, selectUserState} from "components/redux/user"
import {useNavigate} from "react-router-dom"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

type LinkItemProps = {
  url: string
  icon: JSX.Element
  text: string
}

const Layout = ({children}: LayoutProps) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(selectUserState)

  useEffect(() => {
    if (!user.isLogged) {
      dispatch(setLoginStatus(false))

      window.location.href = ROUTES.LOGIN
    }
  }, [user.isLogged])

  useEffect(() => {
    if (!user.details.Username) {
      navigate(ROUTES.UPDATE_PROFILE)
    }
  }, [user])

  useEffect(() => {
    saveItem("page", location.pathname)
  }, [location.pathname])

  const LinkItem = ({url, icon, text}: LinkItemProps) => {
    const isActive = location.pathname == url

    return (
      <Link to={url}>
        <div className={`mb-10 flex ${isActive ? "active-nav-link" : "nav-link"}`}>
          {icon}

          <p className="ml-3">{text}</p>
        </div>
      </Link>
    )
  }

  const Links = [
    {
      url: ROUTES.HOME,
      icon: <HomeOutlined />,
      text: "Home",
    },
    {
      url: ROUTES.MESSAGES,
      icon: <MessageOutlined />,
      text: "Messages",
    },
    {
      url: ROUTES.NOTIFICATIONS,
      icon: <BellOutlined />,
      text: "Notifications",
    },
    {
      url: ROUTES.PROFILE,
      icon: <UserOutlined />,
      text: "Profile",
    },
    {
      url: ROUTES.SETTINGS,
      icon: <SettingOutlined />,
      text: "Settings",
    },
    {
      url: ROUTES.BOOKMARKS,
      icon: <BookOutlined />,
      text: "Bookmarks",
    },
  ]

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <aside className="h-screen bg-[#161c24] p-5 w-80">
        <div className="mt-4 ml-5">
          <Logo />
        </div>

        <div className="mt-10">
          {Links.map(({icon, text, url}) => (
            <LinkItem icon={icon} text={text} url={url} key={url} />
          ))}

          <div
            className="mb-5 nav-link cursor-pointer flex items-center"
            onClick={() => dispatch(logoutUser())}
          >
            <LogoutOutlined />

            <p className="ml-3">Logout</p>
          </div>
        </div>
      </aside>

      <main className="w-full h-screen overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
