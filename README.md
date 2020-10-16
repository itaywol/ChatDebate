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
1. Make the chat appear in a center bubble. Eden.
  1.1 in the margin we will add Ads. Need to look at YNET advertisments to see the HTML syntax used. Omer with Eden.
2. Pureify the different inputs. Critical. Eden
3. Create three pages:
  3.1 "About" - Insert the paragraph uploaded to Discords. Eden.
  3.2 "How to build an argument" - Eden.Omer will send content
  3.3 "Rooms" - a drop down list that will include only Republicans vs Democrats for now. will work on design later. Eden.
  3.4 For each - Omer will send a background.
4. Create a DB (Mongo/postgreSQL). including two tables:
  4.1 - Debaters information (as written in Whatsapp - later to be added to here.)
  4.2 - most common words used. Words and counter
5. Saving the conversation each socket,disconnect in a textfile on the server. This is for lateral analysis.
  5.1 - upload then words andalyzer script. make it work with the DB. Omer.
6. Opening accounts - Omer:
  6.1 - Amazon cloud
  6.2 Facebook business account.
7. Upload and run the server. ALL.
