import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { ChatRoomMessages, ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  private roomId!: string;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  chatForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  chatMessages$: Observable<ChatRoomMessages>;

  socket = io('http://localhost:3000');

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
    this.route.params.subscribe((v) => (this.roomId = v.id));
    this.scrollToBottom();
    this.chatMessages$ = this.chatService
      .getChatMessagesByRoomId(this.roomId)
      .asObservable();
  }

  ngOnInit() {
    this.joinRoom();
    this.socket.on('new-message', (data: string) => {});

    // this.socket.on(
    //   'new-message',
    //   function (data) {
    //     if (
    //       data.message.room === JSON.parse(localStorage.getItem('user')).room
    //     ) {
    //       this.chats.push(data.message);
    //       this.msgData = {
    //         room: user.room,
    //         nickname: user.nickname,
    //         message: '',
    //       };
    //       this.scrollToBottom();
    //     }
    //   }.bind(this)
    // );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getChatMessagesByRoom(roomId: string) {
    this.chatMessages$ = this.chatService
      .getChatMessagesByRoomId(this.roomId)
      .asObservable();
  }

  joinRoom() {
    this.socket.emit('connection');
    // var date = new Date();
    // localStorage.setItem('user', JSON.stringify(this.newUser));
    // this.getChatByRoom(this.newUser.room);
    // this.msgData = {
    //   room: this.newUser.room,
    //   nickname: this.newUser.nickname,
    //   message: '',
    // };
    // this.joinned = true;
    // this.socket.emit('save-message', {
    //   room: this.newUser.room,
    //   nickname: this.newUser.nickname,
    //   message: 'Join this room',
    //   updated_at: date,
    // });
  }

  onSubmit() {
    const message = this.chatForm.controls['message'].value;
    this.chatService.saveChatMessagesByRoomId(this.roomId, message);
    this.socket.emit('save-message', message);
    // this.chatService.saveChat(this.msgData).then(
    //   (result) => {
    //     this.socket.emit('save-message', result);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
