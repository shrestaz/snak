import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatRoomResponse, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-all-chat-rooms',
  templateUrl: './all-chat-rooms.component.html',
  styleUrls: ['./all-chat-rooms.component.scss'],
})
export class AllChatRoomsComponent {
  public allRooms$: Observable<ChatRoomResponse[]>;

  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {
    this.allRooms$ = this.roomsService.getAllRooms();
  }

  goToRoom(roomId: string) {
    const isUserLoggedIn = this.authService.usernameFromResponse;
    if (!isUserLoggedIn) {
      let snackBarRef = this.snackbar.open(
        `Please login first to join a chat room`,
        'Login',
        { duration: 5000, panelClass: ['gray-snackbar'] }
      );
      snackBarRef
        .onAction()
        .subscribe(() => this.router.navigateByUrl('/login'));
      return;
    }
    this.router.navigateByUrl(`/room/${roomId}`);
  }
}
