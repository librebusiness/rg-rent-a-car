import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);
  showForm = false;
  users: User[] = [];

  userForm = this.fb.group({
  })

  ngOnInit() {
    this.usersService.findAll().subscribe({
      next: users => {
        this.users = users;
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
