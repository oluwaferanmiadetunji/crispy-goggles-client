import {useState, useEffect} from "react"
import Layout from "components/layout"
import "./profile.css"
import {Header, SubHeader} from "components/theme/Text"
import {Avatar, Button} from "antd"
import {
  UserOutlined,
  HeartFilled,
  PictureOutlined,
  TeamOutlined,
  EditOutlined,
} from "@ant-design/icons"
import Details from "./components/Details"
import Followers from "./components/Followers"
import Friends from "./components/Friends"
import Gallery from "./components/Gallery"
import {ROUTES} from "utils/constants"
import {useAppSelector, useAppDispatch} from "components/hooks/redux"
import {selectUserState} from "components/redux/user"
import NoImg from "assets/img/no-img.png"
import {getUserData} from "components/api/user"

type TabItemProps = {
  icon: JSX.Element
  text: "Profile" | "Followers" | "Friends" | "Gallery"
}

const TabItems: TabItemProps[] = [
  {
    icon: <UserOutlined />,
    text: "Profile",
  },
  {
    icon: <HeartFilled />,
    text: "Followers",
  },
  {
    icon: <TeamOutlined />,
    text: "Friends",
  },
  {
    icon: <PictureOutlined />,
    text: "Gallery",
  },
]

const Profile = () => {
  const user = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = useState<
    "Profile" | "Followers" | "Friends" | "Gallery"
  >("Profile")

  const TabItem = ({icon, text}: TabItemProps) => {
    return (
      <Button
        onClick={() => setActiveTab(text)}
        className={activeTab == text ? "active-profile-tab" : "profile-tab"}
        icon={icon}
        size="large"
        style={{borderRadius: "0px"}}
      >
        {text}
      </Button>
    )
  }

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  return (
    <Layout title="Profile">
      <div className="w-full p-10">
        <Header text="Profile" />

        <div className="mt-9 rounded-xl pb-10 bg-[#212b36] relative">
          <img
            src={user?.details?.HeaderImage}
            className="w-full filter backdrop-blur-md opacity-20 h-60"
          />

          <Button
            icon={<EditOutlined style={{color: "white", marginRight: "5px"}} />}
            className="absolute left-auto right-0 top-0 bg-[#00AB55] hover:bg-[#007B55] flex text-center items-center text-white hover:text-white font-bold py-2 px-4 rounded-md focus:outline-none h-10"
            style={{color: "white", border: "1px solid transparent"}}
            type="link"
            href={ROUTES.UPDATE_PROFILE}
          >
            Edit Profile
          </Button>

          <div className="absolute right-auto flex items-center left-6 bottom-6">
            <Avatar
              src={user?.details?.Img || NoImg}
              className="border border-white"
              size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100}}
            />

            <div className="ml-5 text-left justify-start">
              <Header text={user?.details?.Name} style="text-left justify-start" />
              <SubHeader text={user?.details?.Username} style="text-left justify-start" />
            </div>
          </div>

          <div className="flex justify-end px-5 mt-5">
            {TabItems.map(({icon, text}) => (
              <TabItem icon={icon} text={text} key={text} />
            ))}
          </div>
        </div>

        <div className="mt-9">
          {activeTab == "Followers" && <Followers />}
          {activeTab == "Friends" && <Friends />}
          {activeTab == "Gallery" && <Gallery />}
          {activeTab == "Profile" && <Details />}
        </div>
      </div>
    </Layout>
  )
}

export default Profile
