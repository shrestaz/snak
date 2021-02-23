import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface ChatRoom {
  name: string;
  description: string;
  emoji: string;
  createdBy: string;
}

export interface ChatRoomResponse extends ChatRoom {
  _id: string;
  messagesCount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private baseUrl = environment.apiUrl;
  createRoomResponse = new BehaviorSubject<{
    success: boolean;
    error?: string;
  }>({
    success: false,
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getAllRooms() {
    const allRoomsEndpoint = `${this.baseUrl}/getAllChatRooms`;
    const response = this.http.get(allRoomsEndpoint) as Observable<
      ChatRoomResponse[]
    >;
    return response;
  }

  public getRoomById(roomId: string) {
    const getRoomEndpoint = `${this.baseUrl}/getChatRoomById/${roomId}`;
    const response = this.http.get(getRoomEndpoint) as Observable<ChatRoom>;
    return response;
  }

  public createRoom(room: ChatRoom) {
    let responseData: { success: boolean; message?: string } = {
      success: false,
    };
    const headers = this.authService.getHeaderWithAuth();
    const createRoomEndpoint = `${this.baseUrl}/createChatRoom`;
    const response = this.http.post(createRoomEndpoint, room, {
      headers,
    });
    response
      .pipe(
        tap((data) => {
          this.createRoomResponse.next({
            success: true,
          });
        }),
        catchError((data) => {
          this.createRoomResponse.next({
            success: false,
            error: data.error.error,
          });
          return of();
        })
      )
      .subscribe();
    return responseData;
  }
}
