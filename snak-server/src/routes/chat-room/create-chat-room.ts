import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { ChatRoom } from '../../interfaces/chat-room';
import { isChatRoomNameTaken } from './helpers/is-chat-room-name-taken';

export async function createChatRoom(req: Request, res: Response) {
  try {
    const db = await getDb();

    // Extract username from response whic authentication middleware sets
    const authorizedUser = res.locals.username;
    const { name, description } = req.body as ChatRoom;

    if (!name || !description) {
      return res.status(400).json({
        error: `Please provide a name and description for the chat room.`,
      });
    }
    const emoji = req.body.emoji;

    const roomNameTaken = await isChatRoomNameTaken(name, db);

    if (roomNameTaken) {
      return res.status(400).json({
        error: `Room name "${name}" is already taken. Please choose a different name.`,
      });
    }

    const insertResult = await db
      .collection<ChatRoom>(dataCollection.ChatRooms)
      .insertOne({
        name,
        description,
        createdBy: authorizedUser,
        emoji: emoji ?? null,
      });
    console.log(
      `Chat room created with name ${name} and id ${insertResult.insertedId}`
    );
    return res
      .status(201)
      .json({ message: `Chat room "${name}" successfully created.` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: `Creating a chat room failed unexpected with ${error.message}`,
    });
  }
}
