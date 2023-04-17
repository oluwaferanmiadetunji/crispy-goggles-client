import {Divider} from "antd"
import {Header, SubHeader, Title, Paragraph} from "components/theme/Text"
import {List} from "antd"
import {
  EnvironmentOutlined,
  MailOutlined,
  TwitterOutlined,
  InstagramFilled,
  LinkedinFilled,
  FacebookFilled,
  CalendarOutlined,
} from "@ant-design/icons"
import {MakePost} from "components/post"
import {getLink, formatThousands, formatDate} from "utils/helpers"
import {useAppSelector} from "components/hooks/redux"
import {selectUserState} from "components/redux/user"

const Details = () => {
  const user = useAppSelector(selectUserState)

  const ProfileData = [
    {
      title: `Live at  ${user?.details?.Location}`,
      icon: <EnvironmentOutlined className="text-white text-md mr-3" />,
    },
    {
      title: user?.details?.Email,
      icon: <MailOutlined className="text-white text-md mr-3" />,
    },
    {
      title: formatDate(user?.details?.DateOfBirth),
      icon: <CalendarOutlined className="text-white text-md mr-3" />,
    },
  ]

  const SocialData = [
    {
      title: getLink(user?.details?.Links, "facebook"),
      icon: (
        <FacebookFilled style={{color: "#1877F2"}} className="text-white text-md mr-2" />
      ),
    },
    {
      title: getLink(user?.details?.Links, "instagram"),
      icon: (
        <InstagramFilled style={{color: "#E4405F"}} className="text-white text-md mr-2" />
      ),
    },
    {
      title: getLink(user?.details?.Links, "linkedin"),
      icon: (
        <LinkedinFilled style={{color: "#0077B5"}} className="text-white text-md mr-2" />
      ),
    },
    {
      title: getLink(user?.details?.Links, "twitter"),
      icon: (
        <TwitterOutlined style={{color: "#1DA1F2"}} className="text-white text-md mr-2" />
      ),
    },
  ]

  return (
    <div className="flex w-full">
      <div className="w-6/12">
        <div className="flex bg-[#212B36] px-10 py-5 rounded-xl justify-between mb-8">
          <div className="text-center">
            <Header text={formatThousands(user?.details?.FollowersCount)} style="mb-2" />
            <SubHeader text="Followers" />
          </div>

          <Divider type="vertical" style={{borderColor: "white", height: "60px"}} />

          <div className="text-center">
            <Header text={formatThousands(user?.details?.FriendsCount)} style="mb-2" />
            <SubHeader text="Friends" />
          </div>
        </div>

        <div className="bg-[#212B36] px-7 py-5 rounded-xl mb-8">
          <Title text="About" />

          <Paragraph text={user?.details?.Bio} style="text-white mt-3" />

          <List
            className="mt-3 text-white"
            itemLayout="horizontal"
            dataSource={ProfileData}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={item.icon}
                  title={
                    <p className="text-white font-semibold text-sm mt-1">{item.title}</p>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        <div className="bg-[#212B36] px-7 py-5 rounded-xl">
          <Title text="Social" />

          <List
            className="mt-3 text-white overflow-hidden"
            itemLayout="horizontal"
            dataSource={SocialData}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={item.icon}
                  title={
                    <a
                      href={item.title}
                      target="_blank"
                      className="text-white font-semibold text-sm mt-1"
                      style={{color: "rgb(145, 158, 171)"}}
                    >
                      {item.title}
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="w-full ml-9">
        <div className="bg-[#212B36] px-7 py-5 rounded-xl mb-8">
          <MakePost />
        </div>
      </div>
    </div>
  )
}

export default Details
