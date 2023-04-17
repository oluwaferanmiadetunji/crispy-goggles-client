package middleware

import (
	"net/http"
	"squawk-server/pkg/helpers"
	"strings"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := strings.TrimPrefix(c.Request.Header.Get("Authorization"), "Bearer ")

		if clientToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "No authorization header provided"})
			c.Abort()
			return
		}

		claims, err := helpers.ValidateToken(clientToken)

		if err != "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": err})
			c.Abort()
			return
		}

		c.Set("email", claims.Email)
		c.Set("name", claims.Name)
		c.Set("username", claims.Username)
		c.Set("id", claims.ID)
		c.Next()
	}
}
