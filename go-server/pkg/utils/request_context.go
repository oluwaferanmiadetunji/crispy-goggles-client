package utils

import (
	"context"

	"squawk-server/pkg/helpers"

	"github.com/gin-gonic/gin"
)

const reqIDHeader = "X-Request-Id"

// PersistContext sets any values we want persisted throughout the life of a request
func PersistContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		reqID := currentReqID(c)
		ctxLogger := New().WithField("reqID", reqID)

		ctx := context.Background()
		ctx = SetRequestLogger(ctx, ctxLogger)
		ctx = SetReqID(ctx, reqID)
		SetReqCtx(ctx, c)

		c.Header(reqIDHeader, reqID)
		c.Next()
	}
}

func currentReqID(c *gin.Context) string {
	var reqID string
	if reqID = c.GetHeader(reqIDHeader); reqID == "" {
		reqID = helpers.GenerateReqID()
	}
	return reqID
}
