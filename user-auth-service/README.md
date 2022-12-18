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

**/api/auth/signin**

POST route, accepts JSON object containing user email and password, checks the validity and user status in the database. Approves user if data is valid and user is "Active". Prompts to check email if user status is still "Pending"

**/api/auth/confirm/:confirmationCode**

GET route, changes user status from "Pending" to "Active" if confirmation code passes validity check in the database

**/api/auth/google**

GET route, initiates passport-google authentication

**/api/auth/google/callback**

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

**/auth/facebook**

GET route, initiates passport-Facebook authentication

**/auth/facebook/callback**

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

