FROM node:16

WORKDIR /usr/src/app

COPY .env ./
COPY package*.json ./
RUN npm install

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm","run","start" ]
