FROM node:16

WORKDIR /usr/src/app

COPY .env ./
COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build
RUN pm2 delete ecosystem.config.js

EXPOSE 8080

CMD [ "npm","run","start:docker" ]
