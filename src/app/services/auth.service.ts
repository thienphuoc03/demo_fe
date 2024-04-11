import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { AxiosService, baseUrl } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private axiosService: AxiosService) {}

  private url = `${baseUrl}/users`;
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  ngOnInit(): void {}

  signIn(signIn: any): Observable<any> {
    return this.axiosService.post(`${this.url}/sign-in`, signIn)
  }

  signUp(signUp: any): Observable<any> {
    return this.axiosService.post(`${this.url}/sign-up`, signUp);
  }

  logOut() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    const isLogin = !!localStorage.getItem('access_token');

    return isLogin;
  }
}
