import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public username$;
  constructor(private authService: AuthService) {
    this.username$ = this.authService.username;
  }

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
}
