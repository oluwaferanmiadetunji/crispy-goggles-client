import {Avatar, Button} from "antd"
import {EnvironmentOutlined, CheckOutlined} from "@ant-design/icons"

type CardProps = {
  img: string
  name: string
  location?: string
  isFollowed: boolean
  id: string
}

const FollowerCard = ({img, isFollowed, name, location, id}: CardProps) => {
  return (
    <div className="flex bg-[#212B36] px-5 py-6 rounded-xl mb-5 w-full items-center justify-between">
      <div className="flex">
        <Avatar src={img} size={{xs: 24, sm: 32, md: 55, lg: 55, xl: 45, xxl: 70}} />

        <div className="ml-3">
          <p className="text-white font-bold mb-1 profile-short w-34">{name}</p>

          {location && (
            <div className="flex items-center w-28">
              <EnvironmentOutlined style={{color: "#919EAB"}} />
              <p className="ml-2 text-[#919EAB] profile-short">{location}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        {isFollowed ? (
          <Button
            className="flex text-center items-center text-[#00AB55] hover:text-white"
            style={{border: "1px solid transparent"}}
            icon={<CheckOutlined style={{color: "#00AB55)", marginRight: "5px"}} />}
          >
            Followed
          </Button>
        ) : (
          <Button style={{color: "white"}}>Follow</Button>
        )}
      </div>
    </div>
  )
}

export default FollowerCard
