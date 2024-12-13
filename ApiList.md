# Code Connect APIs 

## authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## userRouter
- GET /user/requests/received
- GET /user/connection
- GET /user/feed

## requestRouter
- POST /request/send/:status/:userId - status[interested,ignored]
- POST /request/review/:status/:requestId - status[accepted,rejected]

## messageRouter
- GET /message/:userId/:connectionId
- POST /message/:userId/:connectionId