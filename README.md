# ticket-project-api

1. npm start 
2. Send a POST request to `localhost:8080/user/register` with a request like:
```json
{
    "firstName": "tyler",
    "lastName": "slaton",
    "email": "testingg@gmail.com",
    "username": "tyler1231178",
    "password": "testing"
}
```


3. Grab the authToken from the response, put in the authorization header, and send a GET request to `localhost:8080/user/me`
4. With the same authToken in the header, send a DELETE request to localhost:8080/user/logout