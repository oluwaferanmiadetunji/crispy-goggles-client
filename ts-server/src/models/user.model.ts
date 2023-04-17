import mongoose from 'mongoose'
import paginate from '../plugins/paginate.plugin'
import toJSON from '../plugins/toJSON.plugin'
import { UserDocument } from '../types/models.types'

const userSchema = new mongoose.Schema<UserDocument>(
  {
    _id: String,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
    },
    date_of_birth: {
      type: String,
      trim: true,
    },
    created_at: {
      type: String,
      trim: true,
    },
    updated_at: {
      type: String,
      trim: true,
    },
    friends_count: {
      type: Number,
      trim: true,
      default: 0,
    },
    followers_count: {
      type: Number,
      trim: true,
      default: 0,
    },
    bio: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
    header_image: {
      type: String,
      trim: true,
    },
    links: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

const User = mongoose.model('Users', userSchema)

export default User
