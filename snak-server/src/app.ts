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
import { getMessagesForChatRoom } from './routes/chat-room/get-messages-for-room';
import { saveMessagesForChatRoom } from './routes/chat-room/save-messages-for-room';

const app = express();
app.use(cors());
app.use(json());
const http = new Server(app);
const io = require('socket.io')(http, { cors: { origins: [] } }) as Socket;

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

app.get(
  '/chatRoom/:chatRoomId',
  async (req: Request, res: Response) => await getMessagesForChatRoom(req, res)
);

app.post(
  '/chatRoomMessages/:chatRoomId',
  async (req: Request, res: Response) => await saveMessagesForChatRoom(req, res)
);

io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data: string) {
    io.emit('new-message', { message: data });
  });
});
