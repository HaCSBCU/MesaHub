FROM node:boron

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN yarn

COPY . /app

EXPOSE 8000
EXPOSE 27017

CMD [ "yarn", "start" ]
