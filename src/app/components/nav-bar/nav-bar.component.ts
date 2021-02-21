import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  // @ViewChild('user-menu') userMenu: ElementRef;

  public username$;
  constructor(private authService: AuthService) {
    this.username$ = this.authService.username;
  }

  logout() {
    this.authService.logout();
  }
}
