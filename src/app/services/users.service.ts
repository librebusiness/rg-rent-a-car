import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ApiUpdateResponse } from '../interfaces/api-update-response';
import { ApiDeleteResponse } from '../interfaces/api-delete-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private endpoint = environment.apiUrl + 'users/';
  private config = { withCredentials: true };
  
  findAll(filters?: any): Observable<User[]> {
    const params: any = {};
    for (let filter in filters) {
      params[filter] = filters[filter];
    }
    return this.http.get<User[]>(this.endpoint, { params, ...this.config });
  }

  findOne(id: string): Observable<User> {
    return this.http.get<User>(this.endpoint + id, this.config);
  }

  create(data: any): Observable<User> {
    return this.http.post<User>(this.endpoint, data, this.config);
  }

  update(id: string, data: any): Observable<ApiUpdateResponse> {
    return this.http.patch<ApiUpdateResponse>(this.endpoint + id, data, this.config);
  }

  delete(id: string): Observable<ApiDeleteResponse> {
    return this.http.delete<ApiDeleteResponse>(this.endpoint + id);
  }
}
