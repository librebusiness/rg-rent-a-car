import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ApiUpdateResponse } from '../interfaces/api-update-response';
import { environment } from '../../environments/environment';
import { LoginPayload } from '../interfaces/login-payload';
import { SignupPayload } from '../interfaces/signup-payload';
import { SignupSuccessResponse } from '../interfaces/signup-success-response';
import { LoginSuccessResponse } from '../interfaces/login-success-response';
import { RecoverPayload } from '../interfaces/recover-payload';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl + 'auth/';
    private config = { withCredentials: true };

    login(payload: LoginPayload): Observable<LoginSuccessResponse> {
        return this.http.post<LoginSuccessResponse>(this.apiUrl + 'login', payload, this.config)
    }

    signup(payload: SignupPayload): Observable<SignupSuccessResponse> {
        return this.http.post<SignupSuccessResponse>(this.apiUrl + 'signup', payload, this.config)
    }

    logout(): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.apiUrl + 'logout', {}, this.config);
    }

    recover(email: string) {
        return this.http.post(this.apiUrl + 'recover', { email }, this.config);
    }

    resetPassword(payload: RecoverPayload) {
        return this.http.post(this.apiUrl + 'reset-password', payload, this.config);
    }

    profile(): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'profile', this.config)
    }

    update(data: User): Observable<ApiUpdateResponse> {
        return this.http.patch<ApiUpdateResponse>(this.apiUrl + 'profile', data, this.config)
    }
}

