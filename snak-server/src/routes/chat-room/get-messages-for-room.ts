import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { MessageDB } from '../../interfaces/message';
import { transformDateToHumanReadable } from './helpers/transform-date-to-human-readable';

export async function getMessagesForChatRoom(req: Request, res: Response) {
  const db = await getDb();
  const chatRoomId = req.params.chatRoomId;

  const messagesForChatRoom = await db
    .collection<MessageDB>(dataCollection.Messages)
    .find({ chatRoomId })
    .toArray();

  const messagesWithReadableDate = transformDateToHumanReadable(
    messagesForChatRoom
  );

  res.status(200).json(messagesWithReadableDate);
}
