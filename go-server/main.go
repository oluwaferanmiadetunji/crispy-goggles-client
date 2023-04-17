package main

import (
	"context"
	"fmt"
	"log"

	"squawk-server/pkg/api/auth"
	"squawk-server/pkg/api/users"
	"squawk-server/pkg/config"
	middleware "squawk-server/pkg/middleware"
	"squawk-server/pkg/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.InitEnvConfigs()

	config.ConnectDB()

	router := gin.New()

	router.Use(utils.PersistContext())
	router.Use(utils.RequestLogger())
	router.Use(middleware.ForceJSON())
	router.Use(middleware.Recover())
	router.Use(gin.Logger())
	router.NoRoute(middleware.NoRoute())
	router.NoMethod(middleware.NoMethod())

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	users.UserRoutes(router)
	auth.AuthRoutes(router)

	if err := router.Run(fmt.Sprintf("%s:%d", config.EnvConfigs.HOST, config.EnvConfigs.PORT)); err != nil {
		log.Fatal(context.Background(), err.Error())
	}
}
