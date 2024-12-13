# Code Connect APIs 

## authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## UserRouter
- GET /user/requests/received
- GET /user/connection
- GET /user/feed

## requestRouter
- POST /request/interested/:userId
- POST /request/ignored/:userId
- POST /request/accepted/:requestId
- POST /request/rejected/:requestId

## Messages
- GET /message/:userId/:connectionId
- POST /message/:userId/:connectionId