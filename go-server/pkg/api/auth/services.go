package auth

import (
	"squawk-server/pkg/api/users"
	"squawk-server/pkg/config"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type GenerateTokenDetails struct {
	Name     string
	Email    string
	Username string
	ID       string
	jwt.StandardClaims
}

func GenerateToken(user users.User) (string, error) {
	config.InitEnvConfigs()

	claims := &GenerateTokenDetails{
		Name:     user.Name,
		Email:    user.Email,
		Username: user.Username,
		ID:       user.Id,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(24)).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(config.EnvConfigs.JWT_SECRET))

	if err != nil {
		return "", err
	}

	return token, nil

}

func ValidatePassword(hashedPassword []byte, password []byte) error {
	err := bcrypt.CompareHashAndPassword(hashedPassword, password)

	return err
}

func HashPassword(password string) ([]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return hash, err
}
