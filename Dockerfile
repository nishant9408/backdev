FROM node:12.13.1-alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python jq
RUN npm install --quiet node-gyp -g

ENV NODE_ENV ${NODE_ENV:-local}

RUN mkdir app

WORKDIR /app

ADD package*.json /app/
ADD node_modules /app/node_modules/

ADD ormconfig.json /app/ormconfig.json
ADD dist /app/dist/
ADD diets /app/diets/

EXPOSE 80

CMD npm run start:${NODE_ENV}
