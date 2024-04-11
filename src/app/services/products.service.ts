import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosService, baseUrl } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private axiosService: AxiosService) {}

  private url = `${baseUrl}/products`;

  getAllProducts(): Observable<any> {
    return this.axiosService.get(this.url);
  }

  deleteProduct(id: number) {
    return this.axiosService.delete(`${this.url}/delete/${id}`);
  }
}
