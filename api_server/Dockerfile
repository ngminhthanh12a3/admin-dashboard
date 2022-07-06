FROM node:16

WORKDIR /mern-app/server

COPY package.json .
COPY yarn.lock .

# install node_modules
# RUN npm i -g yarn@latest 
RUN yarn install --production

# copy all compoent
COPY . .

# Listen port.
# ENV PORT 3004
ARG PORT
EXPOSE $PORT

# Run CMD.
CMD ["yarn", "start"]