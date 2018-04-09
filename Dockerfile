FROM node:8-alpine

# copy code
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --prod
ADD . .

EXPOSE 3000
ENV NODE_ENV production
CMD ["yarn", "start"]
