import {faker} from "@faker-js/faker"

export const user = {
  name: "Adetunji Oluwaferanmi",
  username: "oluwaferanmiadetunji",
  followers_count: 58619,
  friends_count: 71398,
  bio:
    "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.",
  location: "Madagascar",
  email: "ashlynn_ohara62@gmail.com",
  links: [
    "https://www.facebook.com/caitlyn.kerluke",
    "https://www.instagram.com/caitlyn.kerlukee",
    "https://www.linkedin.com/in/caitlyn.kerluke",
    "https://www.twitter.com/caitlyn.kerluke",
  ],
  img: faker.image.avatar(),
  header_img: faker.image.abstract(),
  dateofbirth: new Date(faker.datatype.datetime()).toISOString(),
}

export const generateFollowers = () => {
  const followers = []

  for (let i = 0; i < 10; i++) {
    followers.push({
      img: faker.image.avatar(),
      name: faker.name.fullName(),
      location: faker.address.country(),
      isFollowed: faker.datatype.boolean(),
      id: faker.datatype.uuid(),
    })
  }

  return followers
}

export const generateFriends = () => {
  const friends = []

  for (let i = 0; i < 10; i++) {
    const username = faker.internet.userName()

    friends.push({
      img: faker.image.avatar(),
      username,
      name: faker.name.fullName(),
      id: faker.datatype.uuid(),
      links: [
        `https://www.facebook.com/${username}`,
        `https://www.instagram.com/${username}`,
        `https://www.linkedin.com/in/${username}`,
        `https://www.twitter.com/${username}`,
      ],
    })
  }

  return friends
}
