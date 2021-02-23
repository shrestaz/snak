import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ChatRoomMessages {
  message: string;
  chatRoomId: string;
  from: string;
  sentAt: Date;
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private baseUrl = environment.apiUrl;

  getChatMessagesByRoomId(roomId: string) {
    const response = this.http.get(
      `${this.baseUrl}/chatRoomMessages/${roomId}`
    ) as Observable<ChatRoomMessages[]>;
    return response;
  }

  saveChatMessagesByRoomId(roomId: string, message: string) {
    const currentUser = this.authService.usernameFromResponse;
    const response = this.http.post(
      `${this.baseUrl}/chatRoomMessages/${roomId}`,
      { message, chatRoomId: roomId, from: currentUser, sentAt: new Date() }
    ) as Observable<ChatRoomMessages>;
    response.subscribe();
  }
}
