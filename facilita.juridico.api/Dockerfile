FROM node:20-alpine

WORKDIR /usr/src/api

ENV HOST=0.0.0.0

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

COPY .env.example .env

EXPOSE 3333

CMD ["sh", "-c", "node ace migration:run && node ace db:seed && npm run dev"]
