FROM buildkite/puppeteer

ENV PATH="${PATH}:/node_modules/.bin"
ENV NODE_ENV="production"
WORKDIR /server

COPY package*.json yarn.lock  ./
RUN yarn install

COPY . .
EXPOSE 3000

CMD ["yarn", "start"]