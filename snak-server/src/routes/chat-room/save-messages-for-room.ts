import { getDb } from '../../database-connection';
import { Request, Response } from 'express';
import { Message, MessageDB } from '../../interfaces/message';
import { dataCollection } from '../../enum/data-collection';

export async function saveMessagesForChatRoom(req: Request, res: Response) {
  const db = await getDb();
  const { message, chatRoomId, from, sentAt } = req.body as Message;
  if (message) {
    console.log(message, chatRoomId, from, sentAt);

    await db
      .collection<MessageDB>(dataCollection.Messages)
      .insertOne({ message, chatRoomId, from, sentAt });

    res.status(201).json({ message: `Saved.` });
  }
}
