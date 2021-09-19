# Med center
A backend part of ITRex lab

## Swagger documentation

- Start
  - `docker-compose -f ./doc/swagger-docker-compose.yml -p itrex-project up -d`

  - [Swagger doc](http://localhost:80)
- Stop
  - `docker-compose -f ./doc/swagger-docker-compose.yml -p itrex-project down`
## How to use

- [Wiki]()

- [API Request Examples]()

## **Local run**

- Git clone this repo
- You need to run two _docker containers_ (or standalone Redis and MySQL installation on default ports):
  - **REDIS**: `docker run -d --name itrex-redis -p 6379:6379 redis`
  - **MySQL**: `docker run -p 3306:3306 --name itrex-mysql -e MYSQL_ROOT_PASSWORD=<your db password> mysql:latest`
- npm install && npm start

## **Docker-compose**

- Create a `.env` file at the root of application
- Specify environment variables in the created file:

```
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=<your db password>
MYSQLDB_DATABASE=itrex-mysql
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000
JWT_SECRET=<your secret key>
```

- Start application

  - `docker-compose up -d`

- Stop application

  - `docker-compose down`

- Application is available on **`http://localhost:3000`**

## **Tests**

- tests start with `npm run test` command

