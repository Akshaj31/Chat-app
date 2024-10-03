# API Documentation

This document outlines the API endpoints for the user authentication system in the Chat Application. 

## Base URL
All API requests are made to the following base URL:
http://localhost:3000/api/v1/users


## Authentication Endpoints

### 1. Login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns access and refresh tokens.
- **Request Body**:
  ```json
  {
      "input": "user_email_or_username",
      "password": "user_password"
  }
- **Responses**
    - **200 OK**:

