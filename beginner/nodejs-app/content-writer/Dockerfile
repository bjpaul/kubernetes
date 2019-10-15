FROM node:10.12.0-alpine
MAINTAINER work.bijoypaul@gmail.com

WORKDIR /app
ADD . .
RUN npm install && npm audit fix

CMD node index
