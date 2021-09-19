import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from "@angular/common/http";
import { Revenue } from './revenue.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoIOService {

  constructor(private http:HttpClient) { }

  formData:PaymentDetail = new PaymentDetail();
  readonly baseURL = 'https://crypto-io-game-backend.herokuapp.com/GetUnityAdRevenue';
  list : PaymentDetail[];
  revenue : Revenue;

  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(id:number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as PaymentDetail[])
  }

  getCurrentRevenue() {
    let days = 30;
    let start = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().slice(0, 10);
    let end = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);

    this.http.get(`${this.baseURL}/${start}/${end}`)
    .toPromise()
    .then(res => this.revenue = res as Revenue)
  }
}
