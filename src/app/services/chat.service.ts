import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

export interface ChatRoomMessages {
  message?: string;
  chatRoomId?: string;
  from?: string;
  sentAt?: Date;
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private baseUrl = environment.apiUrl;
  chatRoomMessages = new BehaviorSubject<ChatRoomMessages[]>([]);

  getChatMessagesByRoomId(roomId: string) {
    const response = this.http.get(
      `${this.baseUrl}/chatRoomMessages/${roomId}`
    ) as Observable<ChatRoomMessages>;

    response
      .pipe(
        tap((data) =>
          this.chatRoomMessages.next(
            this.chatRoomMessages.getValue().concat(data)
          )
        ),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe();
    return this.chatRoomMessages;
  }

  saveChatMessagesByRoomId(roomId: string, message: string) {
    console.log(message);
    const currentUser = this.authService.usernameFromResponse;
    const response = this.http.post(
      `${this.baseUrl}/chatRoomMessages/${roomId}`,
      { message, chatRoomId: roomId, from: currentUser, sentAt: new Date() }
    ) as Observable<ChatRoomMessages>;
    response.subscribe();
  }
}
