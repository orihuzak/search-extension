FROM node:13-alpine
WORKDIR /app
RUN apk add zip && \
    yarn install
# CMD ["yarn", "dev"]
CMD [ "sh" ]