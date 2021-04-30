import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    if (this.service.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  updateRecord(form:NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Updated Successfully', 'Payment Detail Register');
        this.service.refreshList();
      }, 
      err => { console.log(err); }
    );
  }

  insertRecord(form:NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted Successfully', 'Payment Detail Register');
        this.service.refreshList();
      }, 
      err => { console.log(err); }
    );
  }

  resetForm(form:NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
