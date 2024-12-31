import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { Observable, tap } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styles: `.mobile-nav-link {
    @apply block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white;
  }

  .current-mobile-nav-link {
    @apply block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white;
  }

  .nav-link {
    @apply rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white;
  }

  .current-nav-link {
    @apply rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white;
  }
  `
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user$: Observable<User> = this.authService.profile().pipe(
    tap(_ => {
      console.log(_)
      if (_.email) {
        this.avatar = `https://gravatar.com/avatar/${CryptoJS.SHA256('orgalay.dev@gmail.com')}`
      } else {
        this.avatar = 'https://www.w3schools.com/howto/img_avatar.png'
      }
      this.userRoles = _.roles;
    })
  );
  private router = inject(Router);
  currentUrl = '/';
  userMenuOpen = false;
  userRoles: string[] = []

  avatar = `https://www.w3schools.com/howto/img_avatar.png`

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e.url)
        this.currentUrl = e.url;
    })
  }

  logout() {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        alert('Hasta luego');
      }
    });
  }
}
