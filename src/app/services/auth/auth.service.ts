import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  baseUrl: string = environment.reqBaseUrl + 'auth/';
  imgUrl: string = environment.imgBaseUrl;
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(payload: any) {
    return this.http.post(this.baseUrl + "login", payload, {
      observe: "response",
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser() {
    return localStorage.getItem("user") || '{}';
  }

  forgotPassword(payload: any) {
    return this.http.post(this.baseUrl + "forgot/password", payload, {
      observe: "response",
    });
  }

  resetPassword(token: string, payload: any) {
    return this.http.post(this.baseUrl + "reset/password/" + token, payload, {
      observe: "response",
    });
  }

  setPassword(payload: any) {
    return this.http.post(this.baseUrl + "forgot", payload, {
      observe: "response",
    });
  }

  loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  storeUserData(token?: string, user?: any) {
    if (token) {
      localStorage.setItem("token", token);
      this.authToken = token;
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    }
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(["/signin"]);
  }
}
