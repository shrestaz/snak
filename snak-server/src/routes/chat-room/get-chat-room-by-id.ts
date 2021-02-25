import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { ChatRoomDB } from '../../interfaces/chat-room';

export async function getChatRoomById(req: Request, res: Response) {
  const db = await getDb();
  const chatRoomId = req.params.chatRoomId;

  const chatRoom = await db
    .collection<ChatRoomDB>(dataCollection.ChatRooms)
    .findOne({ _id: new ObjectId(chatRoomId) });

  if (!chatRoom) {
    return res.status(404).json({
      message: `Chat room with id ${chatRoomId} not found`,
    });
  }
  return res.status(200).json(chatRoom);
}
