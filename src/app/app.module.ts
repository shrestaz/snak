import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HeroIconsModule,
  chatAlt2,
  userCircle,
  arrowCircleLeft,
  x,
} from 'ng-heroicons';
import { AllChatRoomsComponent } from './components/all-chat-rooms/all-chat-rooms.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateChatRoomComponent } from './components/create-chat-room/create-chat-room.component';
import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allRooms', component: AllChatRoomsComponent },
  { path: 'room/:id', component: ChatRoomComponent },
  { path: 'createRoom', component: CreateChatRoomComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    AllChatRoomsComponent,
    ChatRoomComponent,
    CreateChatRoomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HeroIconsModule.withIcons({ chatAlt2, userCircle, arrowCircleLeft, x }),
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
