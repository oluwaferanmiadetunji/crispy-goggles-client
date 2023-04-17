package config

import (
	"log"

	"github.com/spf13/viper"
)

type envConfigs struct {
	URI        string `mapstructure:"URI"`
	PORT       int    `mapstructure:"PORT"`
	HOST       string `mapstructure:"HOST"`
	JWT_SECRET string `mapstructure:"JWT_SECRET"`
	CLIENT_URL string `mapstructure:"CLIENT_URL"`
}

var EnvConfigs *envConfigs

func InitEnvConfigs() {
	EnvConfigs = loadEnvVariables()
}

func loadEnvVariables() (config *envConfigs) {
	// Tell viper the path/location of your env file. If it is root just add "."
	viper.AddConfigPath(".")

	// Tell viper the name of your file
	viper.SetConfigName("app")

	// Tell viper the type of your file
	viper.SetConfigType("env")

	// Viper reads all the variables from env file and log error if any found
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("Error reading env file", err)
	}

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal(err)
	}

	return
}
