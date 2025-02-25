BASE_URL = https://ecomerce-api-lpq4.onrender.com/

1. Sign In
Endpoint:
POST /auth/signin

Request Body (JSON):

json
{
  "username": "testuser",
  "password": "testpassword"
}

Response (Example):

json
{
  "message": "User signed in successfully",
  "data": {
    "id": "12345",
    "username": "testuser",
    "accessToken": "eyJhbGciOi..."
  }
}
2. Login
Endpoint:
POST /auth/login

Request Body (JSON):

json
{
  "username": "testuser",
  "password": "testpassword"
}

Response (Example):

json
{
  "message": "User logged in successfully",
  "data": {
    "id": "12345",
    "username": "testuser",
    "accessToken": "eyJhbGciOi..."
  }
}
3. Get Profile
Endpoint:
GET /auth/profile

Headers:

json
{
  "Authorization": "Bearer <your-access-token>"
}
Response (Example):

json
{
  "id": "12345",
  "username": "testuser",
  "email": "testuser@example.com"
}
4. Forgot Password
Endpoint:
POST /auth/forgotpassword

Request Body (JSON):

json
{
  "email": "testuser@example.com"
}
Response (Example):

json
{
  "message": "Password reset link sent to email",
  "data": {
    "email": "testuser@example.com"
  }
}
5. Reset Password
Endpoint:
PATCH /auth/:token/resetpassword

Replace :token with the actual token from the password reset email.

Request Body (JSON):

json

{
  "password": "newsecurepassword"
}
Response (Example):

json
{
  "message": "Password reset successfully"
}