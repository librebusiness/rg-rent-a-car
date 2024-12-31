import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    // front site
    { path: '', component: HomeComponent },
    { path: 'contact', loadComponent: () => import('./business-contact/business-contact.component').then(mod => mod.BusinessContactComponent) },
    { path: 'locations', loadComponent: () => import('./business-locations/business-locations.component').then(mod => mod.BusinessLocationsComponent) },
    { path: 'services', loadComponent: () => import('./business-services/business-services.component').then(mod => mod.BusinessServicesComponent) },
    { path: 'vehicles', loadComponent: () => import('./business-vehicles/business-vehicles.component').then(mod => mod.BusinessVehiclesComponent) },
    { path: 'not-found', component: NotFoundComponent },
    
    // authentication
    { path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent) },
    { path: 'auth/signup', loadComponent: () => import('./auth/signup/signup.component').then(mod => mod.SignupComponent) },
    { path: 'auth/recover', loadComponent: () => import('./auth/password-recovery/password-recovery.component').then(mod => mod.PasswordRecoveryComponent) },
    { path: 'auth/reset', loadComponent: () => import('./auth/password-reset/password-reset.component').then(mod => mod.PasswordResetComponent) },
    
    // authenticated views
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent) },
    { path: 'profile', loadComponent: () => import('./user-profile/user-profile.component').then(mod => mod.UserProfileComponent) },
    { path: 'settings', loadComponent: () => import('./settings/settings.component').then(mod => mod.SettingsComponent) },
    { path: 'users', loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent) },
    { path: 'users/:username', loadComponent: () => import('./user-profile/user-profile.component').then(mod => mod.UserProfileComponent) },

    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
