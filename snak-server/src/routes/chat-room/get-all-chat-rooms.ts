import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { ChatRoomDB } from '../../interfaces/chat-room';

export async function getAllChatRooms(req: Request, res: Response) {
  try {
    const db = await getDb();

    // aggregation to fetch all chat rooms with message count
    const allChatRooms = await db
      .collection<ChatRoomDB>(dataCollection.ChatRooms)
      .aggregate([
        {
          $addFields: {
            idAsString: {
              $toString: '$_id',
            },
          },
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'idAsString',
            foreignField: 'chatRoomId',
            as: 'messages',
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            createdBy: 1,
            emoji: 1,
            messagesCount: {
              $size: '$messages',
            },
          },
        },
      ])
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
