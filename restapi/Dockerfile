FROM node:18.15.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm ci
RUN npm run build
CMD [ "npm", "start" ]
