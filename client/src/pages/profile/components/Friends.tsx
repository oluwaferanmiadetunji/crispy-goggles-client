import {useEffect, useState} from "react"
import {Header} from "components/theme/Text"
import {Col, Row} from "antd"
import {FriendCard} from "components/cards"
import {generateFriends} from "utils/__dummy"

const Friends = () => {
  const [friends, setFriends] = useState<any[]>([])

  useEffect(() => {
    const friends = generateFriends()

    setFriends(friends)
  }, [])

  return (
    <div className="mt-5">
      <Header text="Friends" style="mb-5" />

      <div className="mt-8">
        <Row gutter={20} align="middle">
          {friends.map((follower) => (
            <Col span={8} key={follower?.id}>
              <FriendCard
                id={follower?.id}
                img={follower?.img}
                username={follower?.username}
                name={follower?.name}
                links={follower?.links}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Friends
