import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

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
  private usersService = inject(UsersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  username = this.route.snapshot.paramMap.get('username');
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
    country: ['República Dominicana'],
    state: [''],
    city: [''],
    address: [''],
    zipCode: [''],
    occupation: [''],
  });

  fillForm(user: User) {
    const { firstname, lastname, username, email, gender, phone, photoURL, country, state, city, address, zipCode, occupation, documentType, documentNumber } = user;
    this.userForm.setValue({
      firstname: firstname || '',
      lastname: lastname || '',
      username: username || '',
      email: email || '',
      gender: gender || '',
      phone: phone || '',
      photoURL: photoURL || '',
      country: country || '',
      state: state || '',
      city: city || '',
      zipCode: zipCode || '',
      address: address || '',
      occupation: occupation || '',
    });
  }

  ngOnInit() {
    if (this.username) {
      this.usersService.findAll({ username: this.username }).subscribe({
        next: (users) => {
          console.log(users)
          if (users.length && users[0]) {
            this.fillForm(users[0]);
            this.userForm.disable()
            this.user = users[0]
          } else {
            this.router.navigateByUrl("/not-found");
          }
        }
      })
    } else {
      this.authService.profile().subscribe({
        next: user => {
          this.user = user;
          this.fillForm(user);
        }
      })
    }
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

