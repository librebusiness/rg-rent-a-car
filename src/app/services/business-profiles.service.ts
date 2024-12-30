import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BusinessProfile } from '../interfaces/business-profile';
import { Observable } from 'rxjs';
import { ApiUpdateResponse } from '../interfaces/api-update-response';
import { ApiDeleteResponse } from '../interfaces/api-delete-response';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfilesService {

  private endpoint = environment.apiUrl + 'business-profile';
  private config = { withCredentials: true };
  private http = inject(HttpClient);
  
  findAll(filters: any): Observable<BusinessProfile[]> {
    const params = new HttpParams();
    for (let filter in filters) {
      params.append(filter, filters[filter]);
    }
    return this.http.get<BusinessProfile[]>(this.endpoint, { params, ...this.config });
  }

  findOne(id: string): Observable<BusinessProfile> {
    return this.http.get<BusinessProfile>(this.endpoint + id, this.config);
  }

  create(data: any): Observable<BusinessProfile> {
    return this.http.post<BusinessProfile>(this.endpoint, data, this.config);
  }

  update(id: string, data: any): Observable<ApiUpdateResponse> {
    return this.http.patch<ApiUpdateResponse>(this.endpoint + id, data, this.config);
  }

  delete(id: string): Observable<ApiDeleteResponse> {
    return this.http.delete<ApiDeleteResponse>(this.endpoint + id);
  }
}
