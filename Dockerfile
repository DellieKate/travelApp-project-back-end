FROM node:alpine

WORKDIR /travelApp

COPY . .

RUN npm install

ENV MONGO_URI=${MONGO_URI}

CMD ["node", "src/index.js"]

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget http://localhost:3000/health || exit 1