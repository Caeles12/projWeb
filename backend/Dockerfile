FROM node:18-alpine
WORKDIR /backend
COPY package.json yarn.lock ./
RUN npm install
COPY . .
EXPOSE 3000