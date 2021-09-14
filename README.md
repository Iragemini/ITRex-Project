# Queue-patient-resolution application

## Endpoints

- _`/api/user`_ - Authorization
  - **POST**   _`/signup`_ - user registration
  - **POST**   _`/login`_ - user authorization
- _`/api/queue`_ - Queue (for patients);
  - **POST**   _`/:doctorId`_ - get into queue
  - **GET**    _`/:doctorId`_ - return current patient in the queue
- _`/api/queue`_ - Queue (for doctors);
  - **GET**    _`/`_ - return current patient in doctor's own queue 
  - **DELETE** _`/`_ - delete current patient from doctor's own queue and return next
- _`/api/resolutions`_ - Resolution
  - **GET**    _`/`_ - return all resolutions
  - **GET**    _`/?patientName=`_ - return resolution by patient name
  - **GET**    _`/me`_ - return resolutions for authorized user
  - **POST**   _`/`_ - add a new resolution
  - **DELETE** _`/:resolutionId`_ - delete resolution

# How to use application:

## **Doctor accounts that you can use:**

email: 'doctor1@gmail.com',
password: '12345678',

email: 'doctor2@gmail.com',
password: '12345678',

email: 'doctor3@gmail.com',
password: '12345678',

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
