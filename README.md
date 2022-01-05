# RESTful api try out

Steps to run this project:

---

1. Install the dependencies

```shell
yarn install
```

2. Copy the .env.example file to the .env file

```shell
cp .env.example .env
```

3. Configure the environment variable to fit to your local environment

4. Start the docker container to have the postgres database installed

```shell
docker-compose up -d
```

5. Sync the database's schema

```shell
yarn typeorm schema:sync
```

6. Start the api server

```shell
yarn ts-node src/index.ts
```
