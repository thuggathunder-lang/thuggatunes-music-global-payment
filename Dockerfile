# Simple Node Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "thuggatunesmusicandglobalpayment.js"]
