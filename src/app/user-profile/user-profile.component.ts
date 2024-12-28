import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  public user: User | null = null;

  userForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    username: [''],
    email: [''],
    gender: [''],
    phone: [''],
    photoURL: [''],
  });

  ngOnInit() {
    this.authService.profile().subscribe({
      next: user => {
        this.user = user;
        const { firstname, lastname, username, email, gender, phone, photoURL } = user;
        this.userForm.setValue({
          firstname: firstname || '',
          lastname: lastname || '',
          username: username || '',
          email: email || '',
          gender: gender || '',
          phone: phone || '',
          photoURL: photoURL || '',
        });
      }
    })
  }

  onSubmit() {
    const profile: any = this.userForm.value;
    this.authService.update(profile).subscribe({
      next: (res) => {
        if (res.modifiedCount == 1) {
          alert('Updated!')
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

