package users

import (
	"time"
)

type User struct {
	Id             string    `bson:"_id"`
	Name           string    `bson:"name" validate:"required"`
	Email          string    `bson:"email" validate:"required"`
	Password       string    `bson:"password" validate:"required"`
	Username       string    `bson:"username,omitempty"`
	DateOfBirth    string    `bson:"date_of_birth,omitempty"`
	CreatedAt      time.Time `bson:"created_at"`
	UpdatedAt      time.Time `bson:"updated_at"`
	FollowersCount int       `bson:"followers_count"`
	FriendsCount   int       `bson:"friends_count"`
	Bio            string    `bson:"bio,omitempty"`
	Location       string    `bson:"location,omitempty"`
	Img            string    `bson:"img,omitempty"`
	HeaderImage    string    `bson:"header_image,omitempty"`
	Links          []string  `bson:"links,omitempty"`
}
