import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.reqBaseUrl + 'users/';

  constructor(private http: HttpClient) { }

  getUser(id: any) {
    return this.http.get(this.baseUrl + id, {
      observe: "response",
    });
  }

  updateUser(id: any, payload: any) {
    return this.http.put(this.baseUrl + id, payload, {
      observe: "response",
    });
  }

  updateUserPassword(id: any, payload: any) {
    return this.http.put(this.baseUrl + id + '/change-password', payload, {
      observe: "response",
    });
  }
}
