import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public username$;
  constructor(private authService: AuthService, private snackbar: MatSnackBar) {
    this.username$ = this.authService.username;
  }

  logout() {
    this.authService.logout();
    this.snackbar.open(`You have been successfully logged out. `, undefined, {
      duration: 3000,
      panelClass: ['gray-snackbar'],
    });
  }
}
