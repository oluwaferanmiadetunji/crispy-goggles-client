package users

import (
	"squawk-server/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	r.POST("/users/register", CreateUser)
	r.POST("/users/finish-register", CompleteUserAccountCreation)
	r.PATCH("/user", middleware.Authenticate(), UpdateUserProfile)
	r.GET("/user", middleware.Authenticate(), GetUserProfile)
	
}
