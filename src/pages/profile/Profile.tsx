import Layout from "components/layout"
import "./profile.css"
import {useState} from "react"
import UserImg from "assets/img/user.jpeg"
import {Header, SubHeader} from "components/theme/Text"
import {Avatar, Button} from "antd"
import {UserOutlined, HeartFilled, PictureOutlined, TeamOutlined} from "@ant-design/icons"
import Details from "./components/Details"
import Followers from "./components/Followers"
import Friends from "./components/Friends"
import Gallery from "./components/Gallery"
import EditProfile from "./components/EditProfile"
import {user} from "utils/__dummy"

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
  const [activeTab, setActiveTab] = useState<
    "Profile" | "Followers" | "Friends" | "Gallery"
  >("Friends")

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

  return (
    <Layout title="Profile">
      <div className="w-full p-10">
        <Header text="Profile" />

        <div className="mt-9 rounded-xl pb-10 bg-[#212b36] relative">
          <img
            src={user?.header_img || UserImg}
            className="w-full filter backdrop-blur-md opacity-20 h-60"
          />

          <EditProfile />

          <div className="absolute right-auto flex items-center left-6 bottom-6">
            <Avatar
              src={user?.img || UserImg}
              className="border border-white"
              size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100}}
            />

            <div className="ml-5 text-left justify-start">
              <Header text={user?.name} style="text-left justify-start" />
              <SubHeader text={user?.username} style="text-left justify-start" />
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
