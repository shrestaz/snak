import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoomResponse, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-all-chat-rooms',
  templateUrl: './all-chat-rooms.component.html',
  styleUrls: ['./all-chat-rooms.component.scss'],
})
export class AllChatRoomsComponent {
  public allRooms$: Observable<ChatRoomResponse[]>;

  constructor(private roomsService: RoomsService) {
    this.allRooms$ = this.roomsService.getAllRooms();
  }
}
