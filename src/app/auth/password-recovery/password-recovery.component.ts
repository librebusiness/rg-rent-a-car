import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-password-recovery',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
    ],
    templateUrl: './password-recovery.component.html',
})
export class PasswordRecoveryComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    email = this.fb.control('', [Validators.email, Validators.required]);

    onSubmit() {
        const email = this.email.value;
        if (!email) return;
        this.authService.recover(email).subscribe({
            next: () => {
                alert('Submitted!');
            },
            error: err => {
                console.log(err.message);
                alert('Error ocurred');
            }
        })
  }
}

