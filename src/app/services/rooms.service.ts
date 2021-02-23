import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ChatRoomResponse {
  _id: string;
  name: string;
  description: string;
  messagesCount?: number;
  emoji: string | null;
  createdBy: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllRooms() {
    const allRoomsEndpoint = `${this.baseUrl}/getAllChatRooms`;
    const response = this.http.get(allRoomsEndpoint) as Observable<
      ChatRoomResponse[]
    >;
    return response;
  }

  public getRoomById(roomId: string) {
    const getRoomEndpoint = `${this.baseUrl}/getChatRoomById/${roomId}`;
    const response = this.http.get(
      getRoomEndpoint
    ) as Observable<ChatRoomResponse>;
    return response;
  }
}
