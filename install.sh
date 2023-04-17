#!/bin/bash

cd client

npm install

cd ../go-server 

go get .

cd ../ts-server

npm install