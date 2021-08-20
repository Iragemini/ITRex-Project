## For start application:

- Git clone this repo
- npm install && npm start

## Endpoints
- Queue: *```/api/queue```*
     - **GET:** *```/api/queue```* - return current patient in queue
     - **POST:** *```/api/queue```* - add new patient to queue
     - **DELETE:** *```/api/queue/:name```* - delete current patient from the queue and return next
- Resolution *```/api/resolution```*
     - **GET** *```/api/resolution/:name```* - return resolution by key
     - **PATCH:** *```/api/resolution/:name```* - add new resolution to patient
     - **PATCH:** *```/api/resolution/:name/delete```* - delete resolution 

## Docker
- Start application 
     - ```docker-compose up -d```

- Stop application
     - ```docker-compose down```

- Application run on  **```http://localhost:3000```**