FROM node:13-buster-slim
WORKDIR /app
RUN apt-get install zip && \
    yarn install
# CMD ["yarn", "dev"]
CMD [ "bash" ]