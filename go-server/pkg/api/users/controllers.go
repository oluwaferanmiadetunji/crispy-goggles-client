package users

import (
	"fmt"
	"net/http"
	"time"

	"squawk-server/pkg/helpers"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

var validate = validator.New()

type CompleteRegistrationRequestBody struct {
	ID          string
	Username    string
	DateOfBirth string
}

type UpdateDetailsRequestBody struct {
	Name        string
	Bio         string
	Location    string
	Img         string
	HeaderImage string
	Links       []string
	Username    string
	DateOfBirth string
}

type GenerateUsersRequestBody struct {
	Count int
}

func CreateUser(c *gin.Context) {
	var user User

	if err := c.Bind(&user); err != nil {
		response := gin.H{
			"message": err.Error(),
		}

		c.JSON(http.StatusBadRequest, response)
		return
	}

	if validationErr := validate.Struct(&user); validationErr != nil {
		response := gin.H{
			"data":    validationErr.Error(),
			"message": "Error creating account",
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	hash, err := helpers.HashPassword(user.Password)

	if err != nil {
		fmt.Println("Error hashing password: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error creating account",
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	createdAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

	newUser := User{
		Name:           user.Name,
		Email:          user.Email,
		Password:       string(hash),
		CreatedAt:      createdAt,
		UpdatedAt:      updatedAt,
		Id:             helpers.GenerateRandomString(8),
		FollowersCount: 0,
		FriendsCount:   0,
	}

	existingUser, _ := GetUserByEmail(user.Email)

	if existingUser.Email != "" {
		response := gin.H{
			"message": "Account already exists",
		}

		c.JSON(http.StatusConflict, response)

		return
	}

	result, err := CreateNewUser(newUser)

	if err != nil {
		fmt.Println("Error creating user: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error creating account",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	fmt.Println("User created successfully with ID: ")
	fmt.Println(result.InsertedID)

	response := gin.H{
		"data":    newUser.Id,
		"message": "Account created successfully",
	}

	c.JSON(http.StatusCreated, response)
}

func CompleteUserAccountCreation(c *gin.Context) {
	var requestBody CompleteRegistrationRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Error binding request body: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error completing registration",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	payload := bson.M{"date_of_birth": requestBody.DateOfBirth, "username": requestBody.Username, "updated_at": updatedAt}

	err := UpdateUser(requestBody.ID, payload)

	if err != nil {
		fmt.Println("Error updating user: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error updating account",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	user, _ := GetUserById(requestBody.ID)

	response := gin.H{
		"data":    user,
		"message": "Account created successfully",
	}

	c.JSON(http.StatusOK, response)

}

func UpdateUserProfile(c *gin.Context) {
	var body UpdateDetailsRequestBody

	id, _ := c.Get("id")

	parsedId := fmt.Sprint(id)

	if err := c.BindJSON(&body); err != nil {
		fmt.Println("Error binding request body: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error updating profile",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	payload := bson.M{"name": body.Name, "username": body.Username, "date_of_birth": body.DateOfBirth, "bio": body.Bio, "location": body.Location, "img": body.Img, "links": body.Links, "header_image": body.HeaderImage, "updated_at": updatedAt}

	err := UpdateUser(parsedId, payload)

	if err != nil {
		fmt.Println("Error updating user: ")
		fmt.Println(err)

		response := gin.H{
			"message": "Error updating account",
		}

		c.JSON(http.StatusInternalServerError, response)

		return
	}

	user, _ := GetUserById(parsedId)

	response := gin.H{
		"data":    user,
		"message": "Profile updated successfully",
	}

	c.JSON(http.StatusOK, response)
}

func GetUserProfile(c *gin.Context) {
	id, _ := c.Get("id")

	parsedId := fmt.Sprint(id)

	user, _ := GetUserById(parsedId)

	response := gin.H{
		"data": user,
	}

	c.JSON(http.StatusOK, response)
}
