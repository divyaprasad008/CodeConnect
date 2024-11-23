## Code Connect Requirements

- create account
- Login
- Update | create profile
- Feed Page - explore people
- Send Connection Request
- See our matches
- See sent/received request
- Report profile
- Block Profile



## HLD - High Level Design
Tech Planning
2 microservices
1. Frontend
  - React JS
2. Backend
  - Node JS
  - Mongo DB 


## LLD - Low Level Design
1. DB Design
  * Users
  - FN
  - LN
  - email
  - password
  - age
  - gender
  
  * ConnectionRequest
  - fromUserId
  - TouserId
  - status - default pending(accepted | rejected | ignored | blocked)



## Api Design {Rest APIs}
GET, POST, PUT, PATCH, DELETE

- POST /signup
- POST /login
- GET /profile
- POST /profile
- PATCH /profile
- DELETE /profile
- POST /sendRequest - (ignore | interested)
- POST /reviewRequest - (accept | reject)
- GET /requests
- GET /connections
- POST /reportProfile
- POST /blockProfile


