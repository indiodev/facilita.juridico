FROM node:20-alpine

WORKDIR /usr/src/web

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

COPY .env.example .env

EXPOSE 5173

CMD ["npm", "run", "dev"]