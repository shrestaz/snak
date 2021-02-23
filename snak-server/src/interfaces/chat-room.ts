import { ObjectId } from 'mongodb';

export interface ChatRoom {
  name: string;
  createdBy: string;
  description: string;
  emoji: string;
  messagesCount?: null;
}

export interface ChatRoomDB extends ChatRoom {
  _id: ObjectId;
}
