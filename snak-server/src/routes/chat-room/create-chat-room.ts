import e, { Request, Response } from 'express';
import { initDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { ChatRoom } from '../../interfaces/chat-room';

export async function createChatRoom(req: Request, res: Response) {
  try {
    const db = await initDb();
    const { name } = req.body as ChatRoom;

    if (!name) {
      return res.status(400).send(`Please provide a name for the chat room.`);
    }

    const isChatRoomNameTaken = await db
      .collection<ChatRoom>(dataCollection.ChatRooms)
      .findOne({ name });

    if (isChatRoomNameTaken) {
      return res
        .status(400)
        .send(
          `Room name "${name}" is already taken. Please choose a different name.`
        );
    }

    const insertResult = await db
      .collection<ChatRoom>(dataCollection.ChatRooms)
      .insertOne({ name });
    console.log(
      `Chat room created with name ${name} and id ${insertResult.insertedId}`
    );
    return res.status(201).send(`Chat room "${name}" successfully created.`);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send(`Creating a chat room failed unexpected with ${error.message}`);
  }
}
