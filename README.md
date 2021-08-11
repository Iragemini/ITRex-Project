## For start application:

- Git clone this repo
- npm install && npm start

## Endpoints
- Queue:
     - **GET:** ```/``` - return current patient in queue
     - **POST:** ```/queue/add``` - add new patient to queue
     - **DELETE:** ```/queue/:name/delete``` - delete current patient from the queue and return next
- Resolution
     - **GET** ```/resolution/:name/show``` - return resolution by key
     - **POST:** ```/resolution/:name/add``` - add new resolution to patient
     - **DELETE:** ```/resolution/:name/delete``` - delete resolution