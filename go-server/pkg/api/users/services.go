package users

import (
	"context"
	"squawk-server/pkg/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = config.GetCollection(config.DB, "users")

func CreateNewUser(user User) (*mongo.InsertOneResult, error) {
	ctx := context.Background()

	result, err := userCollection.InsertOne(ctx, user)

	return result, err
}

func GetUserByEmail(email string) (User, error) {
	ctx := context.Background()
	var user User

	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)

	return user, err
}

func GetUserById(id string) (User, error) {
	ctx := context.Background()
	var user User

	err := userCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)

	return user, err
}

func UpdateUser(id string, body primitive.M) error {
	ctx := context.Background()

	filter := bson.D{{Key: "_id", Value: id}}

	update := bson.D{{Key: "$set", Value: body}}

	_, err := userCollection.UpdateOne(ctx, filter, update)

	return err
}
