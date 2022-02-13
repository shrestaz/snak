import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { Message } from '../../interfaces/message';

export async function saveMessagesForChatRoom(req: Request, res: Response) {
  const db = await getDb();
  const { message, chatRoomId, from, sentAt } = req.body as Message;

  // Only save messages if it exists on the request body
  if (message) {
    await db
      .collection<Message>(dataCollection.Messages)
      .insertOne({ message, chatRoomId, from, sentAt });

    res.status(201).json({ message: `Saved.` });
  }
}
