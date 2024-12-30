import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from '../interfaces/vehicle';
import { Observable } from 'rxjs';
import { ApiUpdateResponse } from '../interfaces/api-update-response';
import { ApiDeleteResponse } from '../interfaces/api-delete-response';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private http = inject(HttpClient);
  private endpoint = environment.apiUrl + 'vehicles/';
  private config = { withCredentials: true };
  
  findAll(filters?: any): Observable<Vehicle[]> {
    const params: HttpParams = new HttpParams();
    for (let filter in filters) {
      params.append(filter, filters[filter]);
    }
    return this.http.get<Vehicle[]>(this.endpoint, { params, ...this.config });
  }

  findOne(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.endpoint + id, this.config);
  }

  create(data: any): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.endpoint, data, this.config);
  }

  update(id: string, data: any): Observable<ApiUpdateResponse> {
    return this.http.patch<ApiUpdateResponse>(this.endpoint + id, data, this.config);
  }

  delete(id: string): Observable<ApiDeleteResponse> {
    return this.http.delete<ApiDeleteResponse>(this.endpoint + id);
  }
}
