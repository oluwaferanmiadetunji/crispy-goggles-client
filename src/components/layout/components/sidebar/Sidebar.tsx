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

type LinkItemProps = {
  url: string
  icon: JSX.Element
  text: string
}

const Sidebar = () => {
  const location = useLocation()

  const LinkItem = ({url, icon, text}: LinkItemProps) => {
    const isActive = location.pathname == url

    return (
      <Link to={url}>
        <div className={`mb-5 ${isActive ? "active-nav-link" : "nav-link"}`}>
          {icon}

          <p className="mt-2">{text}</p>
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
    <aside className="h-screen bg-[#04070f] p-5 w-40 text-center justify-center">
      <div className="mt-10">
        {Links.map(({icon, text, url}) => (
          <LinkItem icon={icon} text={text} url={url} />
        ))}

        <div className="mb-5 nav-link cursor-pointer">
          <LogoutOutlined />

          <p className="mt-2">Logout</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
