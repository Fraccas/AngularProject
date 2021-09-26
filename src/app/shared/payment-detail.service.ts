import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { LeaderboardItem } from './leaderboard-item.model';
import { HttpClient } from "@angular/common/http";
import { Revenue } from './revenue.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoIOService {

  constructor(private http:HttpClient) { }

  //formData:PaymentDetail = new PaymentDetail();
  readonly baseAdsURL = 'http://localhost:5000/GetUnityAdRevenue';//'https://crypto-io-game-backend.herokuapp.com/GetUnityAdRevenue';
  readonly baseLeaderboardURL = 'http://localhost:5000/Leaderboard';
  leaderboardItemList : LeaderboardItem[];
  revenue : Revenue;

  /*postPaymentDetail() {
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
  }*/

  getLeaderboardItems() {
    this.http.get(this.baseLeaderboardURL)
    .toPromise()
    .then(res => this.leaderboardItemList = res as LeaderboardItem[]);
  }

  getCurrentRevenue() {
    //let days = 30;
    //let start = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().slice(0, 10);

    // get revenue for this week
    let start = this.getMonday().toISOString().slice(0, 10);
    let end = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);

    this.http.get(`${this.baseAdsURL}/${start}/${end}`)
    .toPromise()
    .then(res => this.revenue = res as Revenue)
  }

  getMonday() {
    let d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}
