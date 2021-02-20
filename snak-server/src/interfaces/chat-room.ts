import { ObjectId } from 'mongodb';

export interface ChatRoom {
  name: string;
  // createdBy: string;
}

export interface ChatRoomDB extends ChatRoom {
  _id: ObjectId;
}
