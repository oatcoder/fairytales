FROM node:lts

WORKDIR /app

COPY dist/ /app
COPY node_modules /app/node_modules

CMD ["node", "index.js"]

EXPOSE 3001
