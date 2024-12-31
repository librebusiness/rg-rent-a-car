import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  apiUrl = environment.apiUrl + 'auth/google';

  loading = false;

  confirmation = this.fb.control('');

  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {
    const jwt = localStorage.getItem('access_token');
    if (jwt) {
      this.router.navigateByUrl('/user-profile').then(() => {
      });
    }
  }

  get validConfirmation() {
    return this.confirmation.value !== '' && this.confirmation.value == this.signupForm.get('password')?.value;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      if (email && password) {
        this.loading = true;
        this.authService.signup({ email, password, roles: ['customer'] }).subscribe({
          next: (res) => {
            console.log(res)
            const next = this.route.snapshot.queryParamMap.get('next')
            this.router.navigate(next && next != '/' ? next.split('/') : ['/profile'], { queryParamsHandling: 'preserve' }).then(() => {
              this.loading = false;
            });
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

