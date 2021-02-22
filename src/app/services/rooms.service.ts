import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ChatRoomResponse {
  _id: string;
  name: string;
  description: string;
  userCount?: number;
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
    const allRoomsEndpoint = `${this.baseUrl}/chatRooms`;
    const response = this.http.get(allRoomsEndpoint) as Observable<
      ChatRoomResponse[]
    >;
    return response;
  }
}
