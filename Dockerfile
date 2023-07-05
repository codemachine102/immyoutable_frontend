FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN apk add --no-cache git

RUN yarn install --frozen-lockfile
ENV NODE_ENV production
RUN yarn build

EXPOSE 3000

RUN NODE_ENV=production

CMD [ "yarn", "start" ]
