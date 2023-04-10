import {useEffect, useState} from "react"
import {Header} from "components/theme/Text"
import {Col, Row} from "antd"
import {FollowerCard} from "components/cards"
import {generateFollowers} from "utils/__dummy"

const Followers = () => {
  const [followers, setFollowers] = useState<any[]>([])

  useEffect(() => {
    const followers = generateFollowers()

    setFollowers(followers)
  }, [])

  return (
    <div className="mt-5">
      <Header text="Followers" style="mb-5" />

      <div className="mt-8">
        <Row gutter={20} align="middle">
          {followers.map((follower) => (
            <Col span={8} key={follower?.id}>
              <FollowerCard
                id={follower?.id}
                img={follower?.img}
                isFollowed={follower?.isFollowed}
                name={follower?.name}
                location={follower?.location}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Followers
