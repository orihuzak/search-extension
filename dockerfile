FROM node:12-alpine
WORKDIR /app
RUN apk add zip && \
    yarn install
# CMD ["yarn", "dev"]
CMD [ "sh" ]