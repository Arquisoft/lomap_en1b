FROM node:16-slim
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm ci
RUN npm run tsc
CMD [ "npm", "run", "start" ]
