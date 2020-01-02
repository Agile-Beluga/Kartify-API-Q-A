FROM node:12.13.1
WORKDIR /app
ADD . /app
RUN npm install

EXPOSE 80
CMD ["node", "server/index.js"]