import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { Message } from '../../interfaces/message';
import { transformDateToHumanReadable } from './helpers/transform-date-to-human-readable';

export async function saveMessagesForChatRoom(
  req: Request,
  res: Response,
  io: Socket
) {
  const db = await getDb();
  const { message, chatRoomId, from, sentAt } = req.body as Message;

  // Only save messages if it exists on the request body
  if (message) {
    const { insertedId: _id } = await db
      .collection<Message>(dataCollection.Messages)
      .insertOne({ message, chatRoomId, from, sentAt });
    const enrichedMessage = transformDateToHumanReadable([
      { _id, ...req.body },
    ])[0];
    io.emit('new-message', { ...enrichedMessage });
    res.status(201).json({ message: `Saved.` });
  }
}
