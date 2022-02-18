import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ChatRoom, RoomsService } from 'src/app/services/rooms.service';
import { environment } from 'src/environments/environment';
import { transformDateToHumanReadable } from '../../../../snak-server/src/routes/chat-room/helpers/transform-date-to-human-readable';
import {
  ChatRoomMessage,
  ChatRoomMessageEnriched,
} from '../../interfaces/chat-room-message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  public username = this.authService.usernameFromResponse;
  private roomId!: string;
  @ViewChild('messageList') private myScrollContainer!: ElementRef;

  message = new FormControl('', Validators.required);
  chatMessages: BehaviorSubject<ChatRoomMessageEnriched[]> =
    new BehaviorSubject<ChatRoomMessageEnriched[]>([]);

  chatMessages$ = this.chatMessages.asObservable();
  roomDetails$: Observable<ChatRoom>;

  socket = io(environment.apiUrl);

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private roomService: RoomsService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((v) => (this.roomId = v.id));
    this.scrollToBottom();
    this.roomDetails$ = this.roomService.getRoomById(this.roomId);
    this.getChatMessagesByRoom(this.roomId);
  }

  ngOnInit() {
    this.joinRoom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getChatMessagesByRoom(roomId: string) {
    this.chatService
      .getChatMessagesByRoomId(roomId)
      .subscribe((messages) => this.chatMessages.next(messages));
  }

  joinRoom() {
    this.socket.emit('connection');
    this.socket.on('connection-successful', (success: boolean) => {
      if (success) {
        this.getChatMessagesByRoom(this.roomId);
      }
    });
  }

  sendMessage() {
    const message = this.message.value as string;
    const currentUser = this.authService.usernameFromResponse;
    if (message && currentUser) {
      const enrichedMessage: ChatRoomMessage = {
        message,
        chatRoomId: this.roomId,
        from: currentUser,
        sentAt: new Date(),
      };
      this.chatService.sendChatMessageForRoom(this.roomId, message);
      this.socket.emit('message', enrichedMessage);
      this.chatMessages.next([
        ...this.chatMessages.value,
        transformDateToHumanReadable([enrichedMessage])[0],
      ]);
      this.message.reset();
    }
  }

  trackByFunction(index: number, chatMessage: ChatRoomMessageEnriched) {
    return chatMessage.message;
  }
}
