# Stage 0
FROM buildkite/puppeteer
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build


# Stage 1

FROM buildkite/puppeteer

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production=true
COPY --from=0 /app/build ./build
EXPOSE 3001
CMD ["yarn", "start"]