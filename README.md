# Queue-patient-resolution application

Documentation:
https://documenter.getpostman.com/view/15720374/U16kqk72

## Endpoints

- _`/api/user`_ - Authorization
  - **POST**   _`/signup`_ - user registration
  - **POST**   _`/login`_ - user authorization
  - **POST**   _`/doctor/login`_ - doctor authorization
- _`/api/queue`_ - Queue
  - **GET**    _`/:doctorId`_ - return current patient in the queue
  - **POST**   _`/:doctorId`_ - add new patient to queue
  - **DELETE** _`/:doctorId`_ - delete current patient from the queue and return next
- _`/api/resolution`_ - Resolution
  - **GET**    _`/?patientName=`_ - return resolution by patient name
  - **GET**    _`/me`_ - return resolutions for authorized user
  - **POST**   _`/`_ - add a new resolution
  - **DELETE** _`/:resolutionId`_ - delete resolution

# How to use application:

### **Before start**:

- Application supports two types of storage for queue: **_im memory_** (deprecated) and **_redis_**. You can switch this option in `config.js` file : `config.js -> storage -> queueType: 'redis' /* choose 'redis' or 'memory' */`

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

Start application:
```sh
docker-compose up -d
```

Stop application:
```sh
docker-compose down
```

- Application is available on **`http://localhost:3000`**

## **Tests**

Tests can be run via the following command:

```sh
npm run test
```