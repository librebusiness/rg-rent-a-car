import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  apiUrl = environment.apiUrl + 'auth/google';

  loading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {
    const jwt = localStorage.getItem('access_token');
    if (jwt) {
      this.router.navigateByUrl('/user-profile').then(() => {
        // loaded session
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loading = true;
      if (email && password){
        this.authService.login({ email, password }).subscribe({
          next: result => {
            if (result.error) {
              this.loading = false;
            } else {
              this.router.navigate(this.route.snapshot.queryParamMap.get('next')?.split('/') || ['/'], { queryParamsHandling: 'preserve' }).then(() => {
                this.loading = false;
              })
            }
          },
          error: err => {
            console.log(err);
            this.loading = false;
          }
        })
      }
    }
  }
}

