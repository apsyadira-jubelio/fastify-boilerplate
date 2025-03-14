FROM node:22-alpine

RUN mkdir /app
WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

COPY . .
RUN rm -rf .vscode .git .github .gitignore .sample-env
 
RUN yarn install
RUN yarn build

RUN chown -R node:node /app
USER node

ENTRYPOINT ["node", "dist"]
