# Idea Board APIs

- Create Ideas with their title and description.
- View existing ideas or update/ delete them.
- Built using Typescript,Express, OpenSwagger, MongoDB.

### Version 1.1

- Added- Hemlet, Compression
- Logging - Winston, Morgan

### Set up

Requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
$ git clone <repo-link>
$ cd <repo-name>
$ npm install
```

Configure server port & mongo URI in `src/config/config.ts` For ex-

```sh
export const PORT = 8001;
export const MONGO_URI = "mongodb://localhost:27017/idea-board";
```

For dev environments.

```sh
$ npm run start:dev
```

For production environments.

```sh
$ npm run start
```

For API specification, visit:

```sh
http://localhost:<PORT>/swagger
```
