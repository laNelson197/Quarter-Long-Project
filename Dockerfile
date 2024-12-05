#pick a base image
FROM node:22

#create a directory for our app
WORKDIR /app

#move over package.json
COPY ./package.json ./

#install packages
RUN npm install

#copy over the remaining files
COPY . .

#open port 3000
EXPOSE 8080

#run the application - node api
CMD ["npm", "server.js"]