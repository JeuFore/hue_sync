FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 80

CMD [ "npm", "start" ]