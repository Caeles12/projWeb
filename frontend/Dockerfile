FROM node:18-alpine
WORKDIR /frontend
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200