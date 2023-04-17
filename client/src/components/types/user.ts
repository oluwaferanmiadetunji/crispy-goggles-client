export type UserDetailsType = {
  Id: string
  Name: string
  Email: string
  Password: string
  Username?: string
  DateOfBirth?: string
  CreatedAt: string
  UpdatedAt: string
  FollowersCount: number
  FriendsCount: number
  Bio?: string
  Location?: string
  Img?: string
  HeaderImage?: string
  Links?: string[] | null
}
