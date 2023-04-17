package auth

import (
	"fmt"
	"net/http"

	"squawk-server/pkg/api/users"

	"github.com/gin-gonic/gin"
)

type LoginRequestBody struct {
	Email    string
	Password string
}

type LoginResponse struct {
	Token string
	User  users.User
}

func Login(c *gin.Context) {
	var requestBody LoginRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Error binding request body: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error logging in",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	user, err := users.GetUserByEmail(requestBody.Email)

	if err != nil {
		fmt.Println("Error fetching user: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Invalid Credentials",
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	result := ValidatePassword([]byte(user.Password), []byte(requestBody.Password))

	if result != nil {
		fmt.Println("Error validating password: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Invalid Credentials",
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	token, err := GenerateToken(user)

	if err != nil {
		fmt.Println("Error generating token: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Invalid Credentials",
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := gin.H{
		"data": LoginResponse{
			Token: token,
			User:  user,
		},
		"message": "Login successful",
	}

	c.JSON(http.StatusOK, response)
}
