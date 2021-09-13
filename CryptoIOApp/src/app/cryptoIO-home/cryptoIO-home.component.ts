import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { CryptoIOService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-cryptoIO-details',
  templateUrl: './cryptoIO-home.component.html',
  styles: [
  ]
})
export class CryptoIOHomeComponent implements OnInit {

  constructor(public service : CryptoIOService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getCurrentRevenue();
  }

  populateForm(selectedRecord:PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deletePaymentDetail(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error("Deleted Successfully", 'Payment Detail Register');
        },
        err => {console.log(err)}
      )
    }
  }
}
