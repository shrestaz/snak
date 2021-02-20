require('dotenv').config();

import express, { Application, Request, Response } from 'express';
import { Db } from 'mongodb';
import { initDb } from './database-connection';

const app: Application = express();

const port = process.env.PORT;
let db: Db;

app.listen(port, async function () {
  console.log(`App is listening on port ${port}`);
  db = await initDb();
});

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/insertUser', async (req: Request, res: Response) => {
  const result = await db
    .collection('users')
    .insertOne({ name: 'Manish', age: 30 });
  res.send(
    `Inserted document count was ${result.insertedCount} with id ${result.insertedId}`
  );
});
