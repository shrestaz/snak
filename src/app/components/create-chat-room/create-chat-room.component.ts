import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatRoom } from 'snak-server/src/interfaces/chat-room';
import { AuthService } from 'src/app/services/auth.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-create-chat-room',
  templateUrl: './create-chat-room.component.html',
  styleUrls: ['./create-chat-room.component.scss'],
})
export class CreateChatRoomComponent {
  submitted: boolean = false;
  public error: string | undefined = undefined;
  createRoomResponse$ = new Observable<{ success: boolean; error?: string }>();

  createRoomForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    emoji: new FormControl(''),
  });

  constructor(
    private roomService: RoomsService,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.createRoomResponse$ = this.roomService.createRoomResponse.asObservable();
  }

  onSubmit() {
    this.submitted = true;
    const createdBy = this.authService.usernameFromResponse;
    if (!createdBy) {
      return;
    }
    const formValue = this.createRoomForm.value as ChatRoom;
    const { name, description, emoji } = formValue;
    if (!name || !description) {
      return;
    }
    this.roomService.createRoom({
      name,
      emoji,
      description,
      createdBy,
    });
    this.createRoomResponse$
      .pipe(
        tap((v) => {
          console.log(v);
          if (v.success) {
            console.log('asdasd');
            this.router.navigateByUrl('/allRooms');
            this.snackbar.open(
              `Chat room ${name} successfully created 🎉`,
              '',
              { duration: 3000, panelClass: ['green-snackbar'] }
            );
          }
          if (v.error) {
            this.error = v.error;
          }
        })
      )
      .subscribe();
  }
}
