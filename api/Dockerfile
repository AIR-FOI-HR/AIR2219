FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock into a container to be able to resolve dependencies
# These two copy commands are separated because docker caches layers and we don't have to install dependencies if package.json or yarn.lack haven't changed
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY ./dist .

ENV NODE_ENV production

EXPOSE 8000
CMD [ "node", "index.js" ]
USER node