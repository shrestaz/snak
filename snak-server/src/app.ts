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
import { getChatRoomById } from './routes/chat-room/get-chat-room-by-id';

const app = express();
app.use(cors());
app.use(json());
const http = new Server(app);
const io = require('socket.io')(http, { cors: { origins: [] } }) as Socket;

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, async function () {
  console.log(`App is listening on port ${port}`);
  await initDb();
});

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/getAllChatRooms', async (req: Request, res: Response) => {
  await getAllChatRooms(req, res);
});

app.get('/getChatRoomById/:chatRoomId', async (req: Request, res: Response) => {
  await getChatRoomById(req, res);
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
  '/chatRoomMessages/:chatRoomId',
  async (req: Request, res: Response) => await getMessagesForChatRoom(req, res)
);

app.post(
  '/chatRoomMessages/:chatRoomId',
  async (req: Request, res: Response) => await saveMessagesForChatRoom(req, res)
);

io.on('connection', function (socket) {
  console.log('User connected');
  // socket.on('disconnect', function () {
  //   console.log('User{} disconnected');
  // });
  socket.on('message', (message: string) => {
    console.log(message);
    io.emit('message-broadcast', { message });
  });
});
