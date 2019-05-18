FROM node:12-alpine
WORKDIR /app
RUN ["yarn", "install"]
# CMD ["yarn", "dev"]
CMD [ "sh" ]