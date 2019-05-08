FROM node:12.0-alpine
WORKDIR /app
RUN ["yarn", "install"]
CMD ["yarn", "dev"]
# CMD [ "sh" ]