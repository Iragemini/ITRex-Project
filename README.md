# Queue-patient-resolution application

## Endpoints

- Queue: _`/api/queue`_
  - **GET:** _`/api/queue`_ - return current patient in queue
  - **POST:** _`/api/queue`_ - add new patient to queue
  - **DELETE:** _`/api/queue/:name`_ - delete current patient from the queue and return next
- Resolution _`/api/resolution`_
  - **GET** _`/api/resolution/:name`_ - return resolution by key
  - **PATCH:** _`/api/resolution/:name`_ - add new resolution to patient
  - **PATCH:** _`/api/resolution/:name/delete`_ - delete resolution

#

# How to use application:

### **Before start**:
- Application supports two types of storage for queue: ***im memory*** and ***redis***. You might switch this option in ```config.js``` file : ```config.js -> storage -> queueType: 'redis' /* choose 'redis' or 'memory' */```

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
```

- Start application

  - `docker-compose up -d`

- Stop application

  - `docker-compose down`

- Application is available on **`http://localhost:3000`**

## **Tests**

- tests starts with `npm run test` command
