import { Db } from 'mongodb';
import { dataCollection } from '../../../enum/data-collection';
import { ChatRoomDB } from '../../../interfaces/chat-room';

export async function isChatRoomNameTaken(chatRoomName: string, db: Db) {
  const isRoomNameTaken = await db
    .collection<ChatRoomDB>(dataCollection.ChatRooms)
    .findOne({ name: chatRoomName });
  return !!isRoomNameTaken;
}
