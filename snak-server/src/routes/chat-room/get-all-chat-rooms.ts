import { Request, Response } from 'express';
import { initDb } from '../../database-connection';
import { ChatRoomDB } from '../../interfaces/chat-room';
import { dataCollection } from '../../enum/data-collection';

export async function getAllChatRooms(req: Request, res: Response) {
  try {
    const db = await initDb();
    const allChatRooms = await db
      .collection<ChatRoomDB>(dataCollection.ChatRooms)
      .find({})
      .toArray();

    const allChatRoomsWithStringId = allChatRooms.map((v) => ({
      ...v,
      _id: v._id.toHexString(),
    }));
    return res.status(200).json(allChatRoomsWithStringId);
  } catch (error) {
    return res
      .status(500)
      .send(`getAllChatRooms failed unexpectedly with error ${error.message}`);
  }
}
