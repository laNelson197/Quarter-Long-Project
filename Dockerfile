#pick a base image
FROM node:16

#create a directory for our app
WORKDIR /app

#move over package.json
COPY package.json .
RUN npm install

#install packages
RUN npm install

#copy over the remaining files
COPY . .

#open port 80
EXPOSE 80

#run the application - node api
CMD ["npm", "run", "dev"]