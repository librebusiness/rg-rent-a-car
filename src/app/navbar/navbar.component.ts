import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user$ = this.authService.profile();

  logout() {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        alert('Hasta luego');
      }
    });
  }
}
