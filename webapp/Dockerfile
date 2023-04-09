#FROM node:18.15.0
#LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1b
#COPY . /app
#WORKDIR /app
#Install the dependencies
#RUN npm install

#tengo que ver donde exactamente esta el recurso
#ARG API_URI="http://localhost:8082/api"
#ENV REACT_APP_API_URI=$API_URI

#Cuando tengamos para hacer build, podemos hacer build y luego prod para ejecutar la version del build
#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]


#Build environment
FROM node:18.15.0
WORKDIR /app
ARG API_URI="http://localhost:8082/api"
ENV REACT_APP_API_URI=$API_URI

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.0 -g --silent
COPY . ./
RUN npm run build

# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/container/etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]