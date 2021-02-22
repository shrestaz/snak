import { ObjectId } from 'mongodb';

export interface Message {
  message?: string;
  chatRoomId?: string;
  from?: string;
  sentAt?: Date;
}

export interface MessageDB extends Message {
  _id: ObjectId;
}
