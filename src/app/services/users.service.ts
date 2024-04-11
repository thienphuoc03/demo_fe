import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosService, baseUrl } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private axiosService: AxiosService) {}

  private url = `${baseUrl}/users`;

  getUsers(): Observable<any> {
    return this.axiosService.get(this.url);
  }

  getAllUsers(): Observable<any> {
    return this.axiosService.get(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.axiosService.get(this.url);
  }

  getProfile(): Observable<any> {
    return this.axiosService.get(`${this.url}/profile/me`);
  }

  createUser(createUser: any): Observable<any> {
    return this.axiosService.post(`${this.url}/create`, createUser);
  }

  updateUser(updateUser: any, id: number): Observable<any> {
    return this.axiosService.patch(`${this.url}/update/${id}`, updateUser);
  }

  deleteUser(id: number) {
    return this.axiosService.delete(`${baseUrl}/users/delete/${id}`);
  }
}
