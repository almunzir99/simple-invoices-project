import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers.model';
import { ApiResponse } from '../models/wrappers/api-response.model';
import { PagedResponse } from '../models/wrappers/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private moduleBaseUrl = ``;

  constructor(private http: HttpClient, @Inject("BASE_API_URL") baseUrl: string) {
    this.moduleBaseUrl = `${baseUrl}api/Customers/`

  }
  get(pageIndex = 1, pageSize = 10, title = ""): Observable<PagedResponse<Customer[]>> {
    var params: any = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      title: title
    }
    return this.http.get(`${this.moduleBaseUrl}`, { params: params }) as Observable<PagedResponse<Customer[]>>;
  }
  post(item: Customer) {
    return this.http.post(`${this.moduleBaseUrl}`, item);
  }
  put(item: Customer) {
    return this.http.put(`${this.moduleBaseUrl}${item.customerId}`, item);
  }
  single(id: number): Observable<ApiResponse<Customer>> {
    return this.http.get(`${this.moduleBaseUrl}${id}`) as Observable<ApiResponse<Customer>>;
  }
  delete(id: number) {
    return this.http.delete(`${this.moduleBaseUrl}${id}`);
  }
}
