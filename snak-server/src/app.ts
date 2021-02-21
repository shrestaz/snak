require('dotenv').config();

import { json } from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { Db } from 'mongodb';
import { login } from './routes/authentication/login';
import { signUp } from './routes/authentication/sign-up';
import { initDb } from './database-connection';
import { getAllChatRooms } from './routes/chat-room/get-all-chat-rooms';
import { createChatRoom } from './routes/chat-room/create-chat-room';
import { authentication } from './middleware/authentication';
import cors from 'cors';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { chatSocket } from './chat-socket/chat-socket';

const app: Application = express();
const http = new Server(app);
const io = require('socket.io')(http) as Socket;

app.use(json());
app.use(cors());

const port = process.env.PORT;
let db: Db;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, async function () {
  console.log(`App is listening on port ${port}`);
  db = await initDb();
});

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/chatRooms', async (req: Request, res: Response) => {
  await getAllChatRooms(req, res);
});

app.post(
  '/createChatRoom',
  authentication,
  async (req: Request, res: Response) => await createChatRoom(req, res)
);

app.post(
  '/user/signUp',
  async (req: Request, res: Response) => await signUp(req, res)
);

app.post(
  '/user/login',
  async (req: Request, res: Response) => await login(req, res)
);

//www.digitalocean.com/community/tutorials/angular-socket-io
// io.on('connection', (socket: Socket) => chatSocket(socket));
https: io.on('connection', (socket: Socket) => {
  let previousId: string;

  const safeJoin = (currentId: string) => {
    socket.leave(previousId);
    socket.join(currentId);
    console.log(`Socket ${socket.id} joined room ${currentId}`);
    previousId = currentId;
  };

  socket.on('getDoc', (docId) => {
    safeJoin(docId);
    socket.emit('document');
  });

  // create chat room data collection with docs
  // get chat room "document by id"

  // ...
});
