import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent) },
    { path: 'auth/signup', loadComponent: () => import('./auth/signup/signup.component').then(mod => mod.SignupComponent) },
    { path: 'auth/recover', loadComponent: () => import('./auth/password-recovery/password-recovery.component').then(mod => mod.PasswordRecoveryComponent) },
    { path: 'auth/reset', loadComponent: () => import('./auth/password-reset/password-reset.component').then(mod => mod.PasswordResetComponent) },
    { path: 'user-profile', loadComponent: () => import('./user-profile/user-profile.component').then(mod => mod.UserProfileComponent) },
];
