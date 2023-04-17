# BUILD STAGE
FROM golang:1.19-alpine AS builder

WORKDIR /workspace

COPY ./ ./

RUN go get -d -v ./... m,n

# Build the API
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /usr/local/bin/squawk-server ./

# FINAL STAGE
FROM alpine:3.9

RUN apk add --no-cache ca-certificates

COPY --from=builder /usr/local/bin/squawk-server /usr/local/bin/

RUN chown -R nobody:nogroup /usr/local/bin/squawk-server

USER nobody

EXPOSE 8080

CMD [ "squawk-server" ]
