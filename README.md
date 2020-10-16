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
1. Navigation Bar (Icon on the left, HOME, ABOUT, on the right side EXIT icon which will lead the user back to the ROOT path, and NEXT button for the next conversation
2. Advertisement: Facebook for business, google, SEO, data traffic, discord


---

### Messages Format

> Message
```javascript
Client.emit("message","my message") // for emitting as client
Client.on("message",({body,sender:{id,name}})=>{...}) // for listeneing as client
```

> Typing
```javascript
Client.emit("typing") // for emitting as client
Client.on("typing",({body,sender:{id,name}})=>{...}) // for listening as client
Client.on("stop-typing",({body,sender:{id,name}})=>{...}) // for listening to stop typing event usually occours 5 secs after typing
```

> Matching made and chat room opened for two sides to debate on
```javascript
Client.on("match",({participants})=>{...}) // participants is {id,name}[] (array of objects that hold id and name) for now it only sends one participant but it supports more
```

> Someone disconnected
```javascript
Client.on("disconnect",()=>{}) // other side disconnected (usually you would like to move back to loading screen and restart the socket to get back to queue)
```

  
