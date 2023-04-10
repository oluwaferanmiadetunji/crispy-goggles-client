import {Avatar, Button} from "antd"
import {
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  FacebookFilled,
  LinkOutlined,
} from "@ant-design/icons"

type CardProps = {
  img: string
  name: string
  username: string
  links: string[]
  id: string
}

const renderLinks = (link: string) => {
  if (link.includes("facebook")) {
    return (
      <a href={link} target="_blank">
        <FacebookFilled style={{color: "#1877F2"}} />
      </a>
    )
  } else if (link.includes("instagram")) {
    return (
      <a href={link} target="_blank">
        <InstagramFilled style={{color: "#E4405F"}} />
      </a>
    )
  } else if (link.includes("linkedin")) {
    return (
      <a href={link} target="_blank">
        <LinkedinFilled style={{color: "#0077B5"}} />
      </a>
    )
  } else if (link.includes("twitter")) {
    return (
      <a href={link} target="_blank">
        <TwitterOutlined style={{color: "#1DA1F2"}} />
      </a>
    )
  } else {
    return (
      <a href={link} target="_blank">
        <LinkOutlined style={{color: "grey"}} />
      </a>
    )
  }
}

const FriendCard = ({img, name, id, links, username}: CardProps) => {
  return (
    <div className="bg-[#212B36] px-5 py-9 rounded-xl mb-5 w-full text-center items-center justify-center">
      <div className="mb-5">
        <Avatar src={img} size={{xs: 24, sm: 32, md: 55, lg: 70, xl: 70, xxl: 70}} />
      </div>

      <div className="mt-5">
        <p className="text-white font-bold mb-1 profile-short w-34">{name}</p>
      </div>

      <div className="mt-1">
        <p className="font-display text-[#919EAB] mb-1 profile-short w-34">{username}</p>
      </div>

      <div className="flex text-center mx-auto justify-center mt-5">
        {links.map((link) => (
          <span className="mx-2" key={link}>
            {renderLinks(link)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default FriendCard
