import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { ApiResponse } from '../models/wrappers/api-response.model';
import { PagedResponse } from '../models/wrappers/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private moduleBaseUrl = ``;

  constructor(private http: HttpClient,  @Inject("BASE_API_URL")private baseUrl: string) {
    this.moduleBaseUrl = `${baseUrl}api/Invoices/`

  }
  get(pageIndex = 1, pageSize = 10, title = ""): Observable<PagedResponse<Invoice[]>> {
    var params: any = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      title: title
    }
    return this.http.get(`${this.moduleBaseUrl}`, { params: params }) as Observable<PagedResponse<Invoice[]>>;
  }
  getCustomerInvoices(customerId:number,pageIndex = 1, pageSize = 10, title = ""): Observable<PagedResponse<Invoice[]>> {
    var params: any = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      title: title
    }
    return this.http.get(`${this.baseUrl}api/customers/${customerId}/invoices`, { params: params }) as Observable<PagedResponse<Invoice[]>>;
  }
  post(item: Invoice) {
    return this.http.post(`${this.moduleBaseUrl}`, item);
  }
  put(item: Invoice) {
    return this.http.put(`${this.moduleBaseUrl}${item.invoiceId}`, item);
  }
  single(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.get(`${this.moduleBaseUrl}${id}`) as Observable<ApiResponse<Invoice>>;
  }
  delete(id: number) {
    return this.http.delete(`${this.moduleBaseUrl}${id}`);
  }
}
