FROM node:18

WORKDIR /app

LABEL authors="Marlon Oberberger"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Adjust the copy command to copy the built files to the correct location
RUN cp -r dist/* /app/

EXPOSE 5000

CMD [ "node", "serverStarter.js" ]