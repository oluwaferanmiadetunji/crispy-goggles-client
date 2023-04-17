package config

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	InitEnvConfigs()

	client, err := mongo.NewClient(options.Client().ApplyURI(EnvConfigs.URI))

	if err != nil {
		fmt.Print("Error connecting to Mongo DB: ")
		fmt.Println(err)
	}

	ctx := context.Background()

	err = client.Connect(ctx)

	if err != nil {
		fmt.Print("Error connecting to Mongo DB: ")
		fmt.Println(err)
	}

	err = client.Ping(ctx, nil)

	if err != nil {
		fmt.Print("Error connecting to Mongo DB: ")
		fmt.Println(err)
	}

	fmt.Println("Connected to MongoDB")

	return client
}

var DB *mongo.Client = ConnectDB()

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Squawk").Collection(collectionName)
	return collection
}
