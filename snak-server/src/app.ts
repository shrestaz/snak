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
const app: Application = express();

const port = process.env.PORT;
let db: Db;

app.listen(port, async function () {
  console.log(`App is listening on port ${port}`);
  db = await initDb();
});

app.use(json());

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
