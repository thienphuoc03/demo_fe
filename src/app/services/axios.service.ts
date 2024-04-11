import { Injectable, OnInit } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export const baseUrl: string = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(private toastr: ToastrService) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    });
  }

  private setAuthHeaders() {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.axiosInstance.defaults.headers[
        'Authorization'
      ] = `Bearer ${accessToken}`;
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }

    return;
  }

  handleError(error: any) {
    if (error.statusCode === 403) {
      this.toastr.error('Request admin rights');
    } else if (error.statusCode === 401) {
      this.toastr.error('You haven`t logged in');
    } else {
      this.handleError(error);
    }
  }

  get(url: string, options?: any): Observable<any> {
    this.setAuthHeaders();
    return new Observable((observer) => {
      this.axiosInstance
        .get(url, options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          this.handleError(error);
          observer.error(error);
        });
    });
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance
        .post(url, body, options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          this.handleError(error);
          observer.error(error);
        });
    });
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance
        .put(url, body, options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          this.handleError(error);
          observer.error(error);
        });
    });
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance
        .patch(url, body, options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          this.handleError(error);
          observer.error(error);
        });
    });
  }

  delete(url: string, options?: any): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance
        .delete(url, options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          this.handleError(error);
          observer.error(error);
        });
    });
  }
}
