import { Request, Response } from 'express';
import { initDb } from '../../database-connection';
import { ChatRoom } from '../../interfaces/chat-room';
import { dataCollection } from '../../enum/data-collection';

export async function getAllChatRooms(req: Request, res: Response) {
  const db = await initDb();
  const allChatRooms = await db
    .collection<ChatRoom>(dataCollection.ChatRooms)
    .find({})
    .toArray();
  return allChatRooms;
}
