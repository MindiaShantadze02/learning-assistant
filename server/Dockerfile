FROM node:20-alpine3.20
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY . /app

EXPOSE 3001

CMD ["node", "index.js"]