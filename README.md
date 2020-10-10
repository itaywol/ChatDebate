# ChatDebate

Debate in chat!!!🚀


## How to develop:

1. [Install Docker](https://docs.docker.com/get-docker/): <b>OR</b> get nodejs for backend `npm run start:dev` for frontend `npm start` any you are ready to develop like a peace of shit👎
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. `cp .env.example .env` and edit `.env` file as you wish
4. `docker-compose up -d --build` and you develop like pro


## WebSocket Documentation:

<b>Everything is based on Socket.io</b>

> How to connect?
```javascript
Socket.connect("http://localhost:<BACKEND_PORT AS DEFINED IN ENV>/chat?room=demsvsreps&party=<CHOOSE dems or reps>?name=<SELECT NAME>")
```

> How to send message?
```javascript
Socket.emit("message","my message")
```
> How to listen to messages?
```javascript
Socket.on("message",(data)=>{/* DO WHAT EVER YOU LIKE WITH THE DATA LIKE SAVING TO STATE*/})
// FORMAT OF RECEIVED DATA IS USUALLY: {name:"name of the sender",payload:"the message"}
```
> How to send typing status?
```javascript
Socket.emit("typing",null)
```
> How to listen to typing status?
```javascript
Socket.listen("typing",()=>{/* DO SOMETHING WITH THE TYPING LIKE ... CHANGING THE STATE*/})
// FORMAT OF RECEIVED DATA IS USUALLY: {name:"name of the typing person",payload:"name is typing"}
```

TODO LIST: 
1. We need to get an identifier from socket IO - we need to always render the messages of the current user on the left side, while rendering the messages of the other user on the right side
2. ***Allow communication between 2 users***
4. Navigation Bar (Icon on the left, HOME, ABOUT, on the right side EXIT icon which will lead the user back to the ROOT path, and NEXT button for the next conversation
5. When leaving chat room => close socket connection (socket.disconnect() => show spinner + search for the next person)
6. Advertisement: Facebook for business, google, SEO, data traffic, discord

API:
  1. When connection has established - We need to receive sender's name so frontend can display it in a few places (chatHeader, chatComposer placeholder ...)
  2. When connection has established - Would be better if we can get that indication from somewhere else rather than socket.on('message')
     maybe socket.connection, if it's not possible than at least we need to receive a boolean that indicates the connection - frontend need to show loading indicator meanwhile )
  
