# User Auth Service

This service has a function of adding new users to the users pool by having them follow one of 3 options:
* Email
* Facebook
* Gmail

It adds new users to MongoDB database, and retrieves information/confirms if user with requested email is in the user pool.

**bcrypt** is used for password hashing for users who authenticate via email

After user has been successfully authenticated, **JWT** token is sent back with digitally-signed information about the authenticated user such as their userId, but not the password. It will be sent with each subsequent request to the server in the "Authorization" header.

## Routes

**/api/auth/register** 

POST route, accepts JSON object containing user email and 2 passwords, adds user to the user pool if email is unique (doesn't already exist in the database) and passwords match. New user is added with "Pending" status pending confirmation of email.

**Params**

```
{
    "email": "email@email.com",
    "password": "123456",
    "password2": "123456"
}
```

**Response (if registration was successful)**
```
{
    "message": "Pending registration confirmation for /user email/"
}
```

**/api/auth/updatePassword**

PATCH request, accepts JSON object with email, new password and password comfirmation. Checks if email exists in the database. Update user's password if user exists.

**Params**
```
{
    email,
    password,
    password2
}
Returns: 
status 200 -if update was successfull
status 400 - if user not found
status 422 - if passwords do not match
```
______________________________

**/api/auth/signin**

POST route, accepts JSON object containing user email and password, checks the validity and user status in the database. Approves user if data is valid and user is "Active". Prompts to check email if user status is still "Pending"

**Params**
```
{
    "email": "email@email.com",
    "password": "123456"
}
```

**Response (for inactive user, or invalid data)**
```
{
    "message": "message"
}
```

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________

**/api/auth/confirm/:confirmationCode**

GET route, changes user status from 'pending' to 'active' and returns token if user was confirmed.

**Response**
```
{ 
    token
}
```
______________________________


**/api/auth/google**

To use this route , frontend will need to use it this way: window.open(basaeUrl/api/auth/google);
Authorization will be happening on Google side.
After that there are two possibilities:
if signup/login was sucessful:
/api/auth/login/success
GET route, that creates a token and sends it to the frontend
response: {
                success: true, 
                message: 'sucess',
                user: req.user,
                token: token
            }
If something went wrong:
/login/failed
GET route, response: {
            success: false, 
            message: 'Failure of login attempt'
        }

Please reference Google auth documentation.
______________________________

**/api/auth/google/callback**

This route DOES NOT NEED TO BE FETCHED from frontend. It is an internal route that Google auth uses.

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________


**/auth/facebook**

GET route, initiates passport-Facebook authentication.

Please reference Facebook auth documentation.
______________________________


**/auth/facebook/callback**

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________

