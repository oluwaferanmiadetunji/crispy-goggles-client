package utils

import (
	"context"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// New creates a new logger with a few standard options
func New() *logrus.Logger {
	logger := logrus.New()
	logger.SetLevel(logrus.InfoLevel)
	logger.SetOutput(os.Stdout)
	return logger
}

// Debug wraps logrus Debugf such that logger for the given context
func Debug(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Debugf(msg, args...)
}

// Info wraps logrus Infof such that logger for the given context
func Info(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Infof(msg, args...)
}

// Warn wraps logrus Warnf such that logger for the given context
func Warn(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Warnf(msg, args...)
}

// Error wraps logrus Warnf such that logger for the given context
func Error(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Errorf(msg, args...)
}

// Fatal wraps logrus Fatalf such that logger for the given context
func Fatal(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Fatalf(msg, args...)
}

// Panic wraps logrus Panicf such that logger for the given context
func Panic(ctx context.Context, msg string, args ...interface{}) {
	getLogger(ctx).Panicf(msg, args...)
}

func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		logger := GetRequestLogger(GetReqCtx(c))

		start := time.Now().UTC()
		path := c.Request.URL.Path

		logger.WithFields(logrus.Fields{
			"method":     c.Request.Method,
			"path":       path,
			"ip":         c.ClientIP(),
			"user_agent": c.Request.UserAgent(),
		}).Info()

		c.Next()

		end := time.Now().UTC()
		latency := end.Sub(start)

		logger.WithFields(logrus.Fields{
			"status":     c.Writer.Status(),
			"method":     c.Request.Method,
			"path":       path,
			"ip":         c.ClientIP(),
			"duration":   latency,
			"user_agent": c.Request.UserAgent(),
		}).Info()
	}
}

func getLogger(ctx context.Context) logrus.FieldLogger {
	if ctx != nil {
		return GetRequestLogger(ctx)
	}
	return New()
}
