import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-pass-update',
    standalone: true,
    imports: [
        RouterModule,
        ReactiveFormsModule,
    ],
    templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    oob = this.route.snapshot.queryParamMap.get('oobCode');

    email = this.fb.control('', [Validators.email]);
    password = this.fb.control('', [Validators.minLength(6)]);
    confirmation = this.fb.control('', [Validators.minLength(6)]);

    loading = true;

    ngOnInit(): void {
    }

    onSubmit() {
        const token = this.oob || '';
        const password = this.password.value || '';
        const email = this.email.value || '';

        this.loading = true;

        this.authService.resetPassword({ email, password, token }).subscribe({
            next: () => {
                this.router.navigate(['/user-profile']).then(() => {});
            },
            error: err => {
                alert('Error when saving.')
                this.loading = false;
            }
        });
    }
}

