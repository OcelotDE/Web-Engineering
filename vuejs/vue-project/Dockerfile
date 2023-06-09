FROM node:18

WORKDIR /app

LABEL authors="Marlon Oberberger"

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "preview" ]