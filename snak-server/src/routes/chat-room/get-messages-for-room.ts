import { getDb } from '../../database-connection';
import { Request, Response } from 'express';
import { MessageDB } from '../../interfaces/message';
import { dataCollection } from '../../enum/data-collection';
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
