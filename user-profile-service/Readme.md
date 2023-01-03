# Profile service

This service serves a purpose of registering, updating or deleting profiles of users.

## Routes

**/api/profile** 

GET route, receives JWT payload containing userId and token, checks in the database if profile exists for that userId. If profile doesn't exist, creates the profile. Otherwise returns JSON object with user profile data

**Response**
```
{
    profile: 
        {
            "userId": 12345,
            "name": "Jane Doe",
            "age": 28,
            "reason": ["Looking for new friends","Learning a new language"],
            "photo": "https://photoURL",
            "zodiacSign": "Taurus",
            "bio":"Let's meet, have a cup of coffee and chat? I love theaters, parties and travelling...",
            "location": {
                "city": "Wellington",
                "country": "New Zealand",
                "lat": 37.421875199999995,    // optional
                "lng": -122.0851173           // optional
             }
        }
    message: message
}
```

______________________________

**/api/profile/delete**

GET route, receives JWT payload containing userId and token, checks in the database if profile exists for that userId. If it does, deletes the profile

**Response**
```
{
    "message": "message"
}
```
______________

**/api/profile/name**

POST route, accepts JSON object containing name of the user, adds the name to user profile in the database. The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the name.

**Params**
```
{
    "name": "Jane Doe"
}
```

**Response (if name has been changed successfully)**
```
{
    "name" : "Jane Doe"
    "message": "Name has been successfully updated"
}
```

**Response (in case of error)**
```
{
    "error": "error message"
}
```
______________________________

**/api/profile/dob**

POST route, accepts JSON object containing day, month and year of birth of the user, calculates zodiac sign, adds the date of birth and zodiac sign to user profile in the database. The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the name.

**Params**
```
{
    "day": DD,
    "month": MM,
    "year": YYYY,
}
```

**Response (if data has been updated successfully)**
```
{
    "dateOfBirth": Date object,
    "zodiacSign": user Zodiac sign,
}
```

**Response (in case of error)**
```
{
    "error": "error message"
}
```
______________________________


**/api/profile/location/country/:id**

PUT route, adds the country of residence (from req.params.id) of user to user profile in the database. The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the location (country).

**Response (if country has been updated successfully)**
```
{
    "country" : "country"
}
```

**Response (in case of error)**
```
{
    "error": "error message"
}
```
______________________________


**/api/profile/location/city/:id**

PUT route, adds the city of residence (from req.params.id) of user to user profile in the database. The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the location(city).

**Response (if city has been updated successfully)**
```
{
    "country" : "country",
    "city" : "city",
}
```

**Response (in case of error)**
```
{
    "error": "error message"
}
```
______________________________

**/api/profile/lookingfor**

POST route, accepts JSON object containing an array of user interests, adds each to user profile in the database. The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the user interests

**Params**
```
{
    "interests": []
}
```

**Response (if interests have been updated successfully)**
```
{
    "lookingFor": []
}
```

**Response (in case of error)**
```
{
    "error": "error message"
}
```
______________________________

**/api/profile/photo**

POST route, receives *FormData* object in request body containing user image, processes the image and uploads it to Amazon S3 bucket. Once the upload has been successful, updates user profile with URL of said image.
The route is protected by Passport strategy. It will expect to receive JWT payload with userId and token, and if the user is verified, will proceed to update the user photo

**Response (in case of error)**
```
{
    "err": "error message"
}
```
