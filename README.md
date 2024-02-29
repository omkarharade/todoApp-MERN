# TODO LIST

Basic MERN stack todolist app for regular usage.

## setting up the project

- Clone or download the repo. into your local system.
- go to the project folder
- make sure node and mongo db is installed in your system

```
cd todoApp-MERN/
```

#### INSTALLATION INSTRUCTIONS FOR BACKEND

- go to server folder and install all dependencies

  ```
  cd server/
  npm install
  ```

- create a .env file and add these variables

  ```
  JWT_SECRET_STRING=<JWT secret key (add any string)>
  PORT=<port number>
  ```

- to start the server run the following command

  ```
  npm start
  ```

  will start a server !

  backend should now be running on **http://localhost:[PORT]**

### Dependencies

- For dependencies refer package.json

#### INSTALLATION INSTRUCTIONS FOR FRONTEND

- go to client folder and install all dependencies

  ```
  cd client/
  npm install
  ```

- to start the server run the following command

  ```
  npm start
  ```

  App should now be running on **http://localhost:[PORT]**

### Dependencies

- For dependencies refer package.json

## Available API Routes

### For Testing (Postman)

- Postman extension can be used for testing !

### [User Routes](#1-user-routes)

| Routes                                                      |                   Description                    |
| ----------------------------------------------------------- | :----------------------------------------------: |
| [`POST/api/v1/signup/`](#a-get-list-of-all-heroes)          | Signup to create a user using email and password |
| [`POST/api/v1/login/`](#b-get-details-of-a-particular-hero) |        Login using the email and password        |

## 1. User Routes

### A. Create User

- Send POST request to create a user using email and password

  ```
  Method: POST
  URL: /api/v1/signup/
  Produces: application/json
  ```

  Body:

  | Field    |  Type  | Required | Description      |
  | -------- | :----: | -------- | ---------------- |
  | email    | string | true     | email of user    |
  | password | string | true     | password of user |

  #### Example :

  **Request** : /api/v1/signup

  **Body** :

  | Field    |     value      |
  | -------- | :------------: |
  | email    | user@gmail.com |
  | password |   User@1234    |

  - **Response**:

  ```
  {
      "success": true,
      "message": "Successfully created a new user",
      "data": {
          "email": "user@gmail.com",
          "password": "$2b$10$uzXecnjwVHy5D67F4Q1LIO4oAsn6/kyphmJ9sCZga7xYn/U/vgS5e",
          "_id": "65e00bce98d8fe85eefee70c",
          "createdAt": "2024-02-29T04:45:02.416Z",
          "updatedAt": "2024-02-29T04:45:02.416Z",
          "__v": 0
      },
      "err": {}
  }
  ```

### B. Login User (Generate Token)

- Send POST request to generate token using email and password

  ```
  Method: POST
  URL: /api/v1/login/
  Produces: application/json
  ```

  Body:

  | Field    |  Type  | Required | Description      |
  | -------- | :----: | -------- | ---------------- |
  | email    | string | true     | email of user    |
  | password | string | true     | password of user |

  #### Example :

  **Request** : /api/v1/login

  **Body** :

  | Field    |     value      |
  | -------- | :------------: |
  | email    | user@gmail.com |
  | password |   User@1234    |

  - **Response**:

  ```
  {
      "success": true,
      "message": "Successfully logged in",
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTAwYmNlOThkOGZlODVlZWZlZTcwYyIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MDkxODIyODIsImV4cCI6MTcwOTE4NTg4Mn0.kF6C5podK0fBeHUPeI-2wbG4Fpalsl6QR-SmAX6gjLs",
      "err": {}
  }
  ```
