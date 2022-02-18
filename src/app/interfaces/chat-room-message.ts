export interface RawChatRoomMessage {
  message: string;
  chatRoomId: string;
  from: string;
}

export interface ChatRoomMessage extends RawChatRoomMessage {
  sentAt: Date;
}

export interface ChatRoomMessageEnriched extends RawChatRoomMessage {
  sentAt: string;
}
