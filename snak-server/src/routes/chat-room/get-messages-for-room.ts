import { getDb } from '../../database-connection';
import { Request, Response } from 'express';
import { MessageDB } from '../../interfaces/message';
import { dataCollection } from '../../enum/data-collection';

export async function getMessagesForChatRoom(req: Request, res: Response) {
  const db = await getDb();
  const chatRoomId = req.params.chatRoomId;

  const messagesForChatRoom = await db
    .collection<MessageDB>(dataCollection.Messages)
    .find({ chatRoomId })
    .toArray();

  const messagesWithReadableDate = messagesForChatRoom.map((v) => {
    const date = v.sentAt;
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const day = new Date(date).getUTCDay();
    const month = new Date(date).getUTCMonth() + 1; // Because getmonth() start from 0
    const year = new Date(date).getUTCFullYear();

    const transformedDate = `${hour}:${minutes} on ${day}/${month}/${year}`;

    v.sentAt = transformedDate as any;
    return v;
  });

  res.status(200).json(messagesWithReadableDate);
}
