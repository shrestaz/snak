import { Request, Response } from 'express';
import { initDb } from '../../database-connection';
import { ChatRoom } from '../../interfaces/chat-room';
import { dataCollection } from '../../enum/data-collection';

export async function getAllChatRooms(req: Request, res: Response) {
  try {
    const db = await initDb();
    const allChatRooms = await db
      .collection<ChatRoom>(dataCollection.ChatRooms)
      .find({})
      .toArray();
    return res.status(200).json(allChatRooms);
  } catch (error) {
    return res
      .status(500)
      .send(`getAllChatRooms failed unexpectedly with error ${error.message}`);
  }
}
