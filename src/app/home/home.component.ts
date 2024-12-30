import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessProfilesService } from '../services/business-profiles.service';
import { BusinessProfile } from '../interfaces/business-profile';
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../interfaces/vehicle';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  private businessProfilesService = inject(BusinessProfilesService);
  private vehiclesService = inject(VehiclesService);
  private authService = inject(AuthService);

  profile: BusinessProfile | null = null;
  vehicles: Vehicle[] = [];
  user: User | null = null;
  loaded = {
    business: false,
    vehicles: false,
    user: false,
  }

  logout() {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        alert('Hasta luego');
      }
    });
  }

  ngOnInit() {
    this.authService.profile().subscribe({
      next: user => {
        this.user = user;
        this.loaded.user = true;
      },
      error: error => {
        this.loaded.user = true;
      }
    })
    this.businessProfilesService.findAll({ primary: true }).subscribe({
      next: profile => {
        if (profile.length) {
          this.profile = profile[0];
        }
        this.loaded.business = true;
      },
      error: error => {
        this.loaded.user = true;
      }
    })
    this.vehiclesService.findAll().subscribe({
      next: vehicles => {
        this.vehicles = vehicles;
        this.loaded.vehicles = true;
      },
      error: error => {
        this.loaded.user = true;
      }
    })
  }

  get loading() {
    return this.loaded.business && this.loaded.user && this.loaded.vehicles;
  }
}
