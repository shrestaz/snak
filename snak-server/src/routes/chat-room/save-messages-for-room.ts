import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { Message } from '../../interfaces/message';

export async function saveMessagesForChatRoom(rawMessage: Message) {
  const db = await getDb();
  const { message, chatRoomId, from, sentAt } = rawMessage;

  // Only save messages if it exists on the request body
  if (message) {
    await db
      .collection<Message>(dataCollection.Messages)
      .insertOne({ message, chatRoomId, from, sentAt });
  }
}
