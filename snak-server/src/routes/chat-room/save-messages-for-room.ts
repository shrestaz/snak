import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { Message, MessageDB } from '../../interfaces/message';

export async function saveMessagesForChatRoom(req: Request, res: Response) {
  const db = await getDb();
  const { message, chatRoomId, from, sentAt } = req.body as Message;
  if (message) {
    await db
      .collection<MessageDB>(dataCollection.Messages)
      .insertOne({ message, chatRoomId, from, sentAt });

    res.status(201).json({ message: `Saved.` });
  }
}
