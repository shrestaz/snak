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
  arrowCircleLeftSolid,
} from 'ng-heroicons';
import { AllChatRoomsComponent } from './components/all-chat-rooms/all-chat-rooms.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allRooms', component: AllChatRoomsComponent },
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HeroIconsModule.withIcons({ chatAlt2, userCircle, arrowCircleLeftSolid }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
