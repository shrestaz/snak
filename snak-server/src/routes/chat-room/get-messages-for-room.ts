import { initDb } from '../../database-connection';
import { Request, Response } from 'express';
import { MessageDB } from '../../interfaces/message';
import { dataCollection } from '../../enum/data-collection';

export async function getMessagesForChatRoom(req: Request, res: Response) {
  const db = await initDb();
  const chatRoomId = req.params.chatRoomId;

  const messagesForChatRoom = await db
    .collection<MessageDB>(dataCollection.Messages)
    .find({ chatRoomId })
    .toArray();

  res.status(200).json({ messages: messagesForChatRoom });
}
