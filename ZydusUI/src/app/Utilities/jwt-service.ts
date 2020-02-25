import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/User';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  currentUserSubject: BehaviorSubject<User>;
  currentUser:Observable<any>;

  constructor(private httpClient: HttpClient) { 
    debugger;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  

  login(UserName:string, Password:string) {
    debugger;
    return this.httpClient.post<any>('http://localhost:5002/api/Login', {UserName, Password})
    .pipe(tap(res => {
    localStorage.setItem('access_token', res.token);
    localStorage.setItem('currentUser', JSON.stringify(res));
                this.currentUserSubject.next(res);
}))
}

register(email:string, password:string) {
  return this.httpClient.post<{access_token: string}>('http://www.your-server.com/auth/register', {email, password})
  .pipe(tap(res => {
  this.login(email, password)
}))
}

logout() {
  localStorage.removeItem('access_token');
  this.currentUserSubject.next(null);
}


public get loggedIn(): boolean{
  return localStorage.getItem('access_token') !==  null;
}

public get currentUserValue(): User {
  debugger;
  return this.currentUserSubject.value;
}
}
