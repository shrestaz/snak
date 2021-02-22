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
import { ChatRoomMessages, ChatService } from 'src/app/services/chat.service';
import { ChatRoomResponse, RoomsService } from 'src/app/services/rooms.service';

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

  chatMessages$: Observable<ChatRoomMessages[]>;
  roomDetails$: Observable<ChatRoomResponse>;

  socket = io('http://localhost:3000');

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private roomService: RoomsService
  ) {
    this.route.params.subscribe((v) => (this.roomId = v.id));
    this.scrollToBottom();
    this.roomDetails$ = this.roomService.getRoomById(this.roomId);
    this.chatMessages$ = this.chatService
      .getChatMessagesByRoomId(this.roomId)
      .asObservable();
  }

  ngOnInit() {
    this.joinRoom();
    this.socket.on('new-message', (data: string) => {});
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
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        console.log(`Incoming message: ${JSON.stringify(data)}`);
        this.chatService.getChatMessagesByRoomId(this.roomId).asObservable();
      }
    });
  }

  sendMessage() {
    const message = this.chatForm.controls['message'].value;
    this.chatService.saveChatMessagesByRoomId(this.roomId, message);
    this.socket.emit('message', message);
  }
}
