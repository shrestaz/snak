import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatRoomResponse, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-all-chat-rooms',
  templateUrl: './all-chat-rooms.component.html',
  styleUrls: ['./all-chat-rooms.component.scss'],
})
export class AllChatRoomsComponent {
  public allRooms$: Observable<ChatRoomResponse[]>;

  constructor(private roomsService: RoomsService, private router: Router) {
    this.allRooms$ = this.roomsService.getAllRooms();
  }

  goToRoom(roomId: string) {
    this.router.navigateByUrl(`/room/${roomId}`);
  }
}
