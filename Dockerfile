FROM node:16-alpine as runner
WORKDIR /app

COPY . .

RUN npm start
