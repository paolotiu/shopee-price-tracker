FROM buildkite/puppeteer

ENV PATH="${PATH}:/node_modules/.bin"
WORKDIR /server

COPY package*.json yarn.lock  ./
RUN yarn install

COPY . .
EXPOSE 3000

CMD ["yarn", "start"]