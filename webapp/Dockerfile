FROM node:18.15.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

#tengo que ver donde exactamente esta el recurso
ARG API_URI="http://localhost:8082/api"
ENV REACT_APP_API_URI=$API_URI

#Cuando tengamos para hacer build, podemos hacer build y luego prod para ejecutar la version del build
#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
CMD ["npm", "start"]