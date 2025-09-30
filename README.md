 # User API Documentation

## Endpoints

### 1. `/users/register`

#### Description
This endpoint allows users to register by providing their details. It validates the incoming request data, hashes the password, creates a new user in the database, and generates an authentication token for the user.

#### Required Data
The following fields are required in the request body:

- **fullname**: An object containing:
  - **firstname**: A string with a minimum length of 3 characters (required).
  - **lastname**: A string (optional, minimum length of 3 characters).
- **email**: A string representing the user's email address (required, must be a valid email format).
- **password**: A string with a minimum length of 6 characters (required).

#### Request Example
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response
- **Success (201 Created)**: Returns a JSON object containing the generated authentication token and user details.
  - **Response Example**:
  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with an array of error messages.
  - **Response Example**:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

#### Possible Status Codes
- **201 Created**: User successfully registered.
- **400 Bad Request**: Validation errors occurred.

---

### 2. `/users/login`

#### Description
This endpoint allows users to log in by providing their email and password. It validates the credentials, checks if the user exists, and verifies the password. If successful, it generates an authentication token for the user.

#### Required Data
The following fields are required in the request body:

- **email**: A string representing the user's email address (required, must be a valid email format).
- **password**: A string with a minimum length of 6 characters (required).

#### Request Example
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response
- **Success (200 OK)**: Returns a JSON object containing the generated authentication token and user details.
  - **Response Example**:
  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "_id": "64f6c2...",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with an array of error messages.
  - **Response Example**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email!",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Error (401 Unauthorized)**: If the email or password is incorrect, returns an error message.
  - **Response Example**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Possible Status Codes
- **200 OK**: User successfully logged in.
- **400 Bad Request**: Validation errors occurred.
- **401 Unauthorized**: Invalid email or password.

---

## Notes
- Passwords are hashed before being stored in the database.
- Ensure the `JWT_SECRET` environment variable is set for token generation.
- The returned user object does not include the password field.
---

### 3. `/users/profile`

#### Description
This endpoint allows authenticated users to retrieve their profile information.

#### Authentication
- Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Response
- **Success (200 OK)**: Returns the user's profile information.
  - **Response Example**:
  ```json
  {
    "_id": "64f6c2...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **Error (401 Unauthorized)**: If the user is not authenticated or the token is invalid.
  - **Response Example**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Possible Status Codes
- **200 OK**: User profile retrieved successfully.
- **401 Unauthorized**: Authentication failed.

---

### 4. `/users/logout`

#### Description
This endpoint allows authenticated users to log out by invalidating their current JWT token.

#### Authentication
- Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Response
- **Success (200 OK)**: Confirms the user has been logged out.
  - **Response Example**:
  ```json
  {
    "message": "Logged Out"
  }
  ```

#### Possible Status Codes
- **200 OK**: User successfully logged out.
- **401 Unauthorized**: Authentication failed.




### 5. `/get-fare`

#### Description
This endpoint calculates the estimated fare for a ride based on the provided pickup and destination locations.

#### Required Data
The following fields are required in the request body:
- **pickup**: A string representing the pickup location (required).
- **destination**: A string representing the destination location (required).

#### Request Example
```json
{
  "pickup": "Sector 60, Noida",
  "destination": "Pari Chowk, Greater Noida"
}
```

#### Response
- **Success (200 OK)**: Returns the estimated fare for the ride.
  - **Response Example**:
  ```json
  {
    "fare": 193.20,
    "currency": "INR"
  }
  ```

- **Error (400 Bad Request)**: If the required fields are missing or invalid.
  - **Response Example**:
  ```json
  {
    "errors": [
      {
        "msg": "Pickup location is required",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Destination location is required",
        "param": "destination",
        "location": "body"
      }
    ]
  }
  ```

#### Possible Status Codes
- **200 OK**: Fare calculated successfully.
- **400 Bad Request**: Validation errors occurred.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---
---

## Notes
- Passwords are hashed before being stored in the database.
- Ensure the `JWT_SECRET` environment variable is set for token generation.
- The returned user object does not include the password field.
# Captain API Documentation

## Endpoints

### 1. `/captains/register`

#### Description
This endpoint allows captains to register by providing their details, including vehicle information. It validates the incoming request data, hashes the password, creates a new captain in the database, and generates an authentication token for the captain.

#### Required Data
The following fields are required in the request body:

- **fullname**: An object containing:
  - **firstname**: A string with a minimum length of 3 characters (required).
  - **lastname**: A string (optional, minimum length of 3 characters).
- **email**: A string representing the captain's email address (required, must be a valid email format).
- **password**: A string with a minimum length of 6 characters (required).
- **vehicle**: An object containing:
  - **color**: A string representing the vehicle's color (required, minimum length of 3 characters).
  - **plate**: A string representing the vehicle's plate number (required, minimum length of 3 characters).
  - **capacity**: An integer representing the vehicle's capacity (required, must be at least 1).
  - **vehicleType**: A string representing the type of vehicle (required, must be one of `car`, `motorcycle`, or `auto`).

#### Request Example
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response
- **Success (201 Created)**: Returns a JSON object containing the generated authentication token and captain details.
  - **Response Example**:
  ```json
  {
    "token": "your_jwt_token",
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with an array of error messages.
  - **Response Example**:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### Possible Status Codes
- **201 Created**: Captain successfully registered.
- **400 Bad Request**: Validation errors occurred.

---

### 2. `/captains/login`

#### Description
This endpoint allows captains to log in by providing their email and password. It validates the credentials, checks if the captain exists, and verifies the password. If successful, it generates an authentication token for the captain.

#### Required Data
The following fields are required in the request body:

- **email**: A string representing the captain's email address (required, must be a valid email format).
- **password**: A string with a minimum length of 6 characters (required).

#### Request Example
```json
{
  "email": "jane.doe@example.com",
  "password": "securepassword"
}
```

#### Response
- **Success (200 OK)**: Returns a JSON object containing the generated authentication token and captain details.
  - **Response Example**:
  ```json
  {
    "token": "your_jwt_token",
    "captain": {
      "_id": "64f6c2...",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with an array of error messages.
  - **Response Example**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email!",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Error (401 Unauthorized)**: If the email or password is incorrect, returns an error message.
  - **Response Example**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Possible Status Codes
- **200 OK**: Captain successfully logged in.
- **400 Bad Request**: Validation errors occurred.
- **401 Unauthorized**: Invalid email or password.

---

### 3. `/captains/profile`

#### Description
This endpoint allows authenticated captains to retrieve their profile information.

#### Authentication
- Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Response
- **Success (200 OK)**: Returns the captain's profile information.
  - **Response Example**:
  ```json
  {
    "captain": {
      "_id": "64f6c2...",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (401 Unauthorized)**: If the captain is not authenticated or the token is invalid.
  - **Response Example**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Possible Status Codes
- **200 OK**: Captain profile retrieved successfully.
- **401 Unauthorized**: Authentication failed.

---

### 4. `/captains/logout`

#### Description
This endpoint allows authenticated captains to log out by invalidating their current JWT token.

#### Authentication
- Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Response
- **Success (200 OK)**: Confirms the captain has been logged out.
  - **Response Example**:
  ```json
  {
    "message": "Logout successfully"
  }
  ```

#### Possible Status Codes
- **200 OK**: Captain successfully logged out.
- **401 Unauthorized**: Authentication failed.

---

## Notes
- Passwords are hashed before being stored in the database.
- Ensure the `JWT_SECRET` environment variable is set for token generation.
- The returned captain object does not include the password field.

