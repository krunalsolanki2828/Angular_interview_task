import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private _route: Router) { }

  Auth: any = false;
  user: any = false;

  setUser(user:any) {
    this.user = user
    localStorage.setItem("admin", JSON.stringify(user));
  }

  getUser() {
    this.user = localStorage.getItem('admin');
    return (this.user) ? JSON.parse(this.user) : false;
  }


  setToken(token: string) {
    localStorage.setItem('login', token);
  }

  getToken() {
    return localStorage.getItem('login');

  }

  isAuth() {
  return (this.getToken() ? true : false);
  }
  setList(list:any){
    localStorage.setItem('list', list);
  }

  logout() {
    localStorage.clear();
    this.user = false
    this._route.navigateByUrl('/login');
  }

}