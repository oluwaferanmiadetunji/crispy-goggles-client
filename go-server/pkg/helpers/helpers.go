package helpers

import (
	"fmt"
	"log"
	"math/rand"
	"squawk-server/pkg/config"

	"strings"
	"time"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/go-playground/validator.v9"
	en_translations "gopkg.in/go-playground/validator.v9/translations/en"
)

type GenerateTokenDetails struct {
	Name     string
	Email    string
	Username string
	ID       string
	jwt.StandardClaims
}

func GenerateReqID() string {
	reqID := uuid.New().String()
	return strings.ReplaceAll(reqID, "-", "")
}

func GenerateRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	var seededRand *rand.Rand = rand.New(
		rand.NewSource(time.Now().UnixNano()))

	b := make([]byte, length)

	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}

	return string(b)
}

func FormatErrorResponse(err error) {
	translator := en.New()
	uni := ut.New(translator, translator)

	trans, found := uni.GetTranslator("en")
	if !found {
		log.Fatal("translator not found")
	}

	v := validator.New()

	if err := en_translations.RegisterDefaultTranslations(v, trans); err != nil {
		log.Fatal(err)
	}

	_ = v.RegisterTranslation("required", trans, func(ut ut.Translator) error {
		return ut.Add("required", "{0} is a required field", true) // see universal-translator for details
	}, func(ut ut.Translator, fe validator.FieldError) string {
		t, _ := ut.T("required", fe.Field())
		return t
	})

	_ = v.RegisterTranslation("email", trans, func(ut ut.Translator) error {
		return ut.Add("email", "{0} must be a valid email", true) // see universal-translator for details
	}, func(ut ut.Translator, fe validator.FieldError) string {
		t, _ := ut.T("email", fe.Field())
		return t
	})

	_ = v.RegisterTranslation("passwd", trans, func(ut ut.Translator) error {
		return ut.Add("passwd", "{0} is not strong enough", true) // see universal-translator for details
	}, func(ut ut.Translator, fe validator.FieldError) string {
		t, _ := ut.T("passwd", fe.Field())
		return t
	})

	_ = v.RegisterValidation("passwd", func(fl validator.FieldLevel) bool {
		return len(fl.Field().String()) > 6
	})

	for _, e := range err.(validator.ValidationErrors) {
		fmt.Println(e.Translate(trans))
	}
}

func HashPassword(password string) ([]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return hash, err
}

func ValidateToken(clientToken string) (claims *GenerateTokenDetails, msg string) {
	config.InitEnvConfigs()
	token, err := jwt.ParseWithClaims(clientToken, &GenerateTokenDetails{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.EnvConfigs.JWT_SECRET), nil
	})

	if err != nil {
		msg = err.Error()
		return
	}

	claims, ok := token.Claims.(*GenerateTokenDetails)

	if !ok {
		fmt.Println("Invalid token")
		msg = err.Error()

		return
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		fmt.Println("Expired token")
		msg = err.Error()

		return
	}

	return claims, msg
}
