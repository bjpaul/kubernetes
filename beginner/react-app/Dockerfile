FROM node:10.12.0-alpine
MAINTAINER work.bijoypaul@gmail.com
ENV NODE_ENV production

WORKDIR /app
ADD . .
RUN npm install && npm audit fix && npm run build

CMD npm start
