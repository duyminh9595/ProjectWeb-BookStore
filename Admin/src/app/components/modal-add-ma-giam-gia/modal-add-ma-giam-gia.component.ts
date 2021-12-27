import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { CouponCreate } from 'src/app/models/coupon-create';
import { AddMaGiamgiaService } from './service/add-ma-giamgia.service';

@Component({
  selector: 'app-modal-add-ma-giam-gia',
  templateUrl: './modal-add-ma-giam-gia.component.html',
  styleUrls: ['./modal-add-ma-giam-gia.component.css']
})
export class ModalAddMaGiamGiaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalAddMaGiamGiaComponent>, private ser: AddMaGiamgiaService) { }

  ngOnInit(): void {
  }
  data: CouponCreate = new CouponCreate();
  addEventStart(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    this.data.DateOfCreated = formattedDate;
    console.log(formattedDate)
  }
  addEventEnd(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    this.data.DateOfEnded = formattedDate;
    console.log(formattedDate)
  }
  onNoClick() {
    this.dialogRef.close();
  }
  addMa() {
    this.ser.addCoupon(this.data).subscribe({
      next: res => {
        this.onNoClick();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  onKeyDescription(event: any) {
    this.data.CouponCode = event.target.value;
    this.data.DetailCoupon = event.target.value;
  }
  onKeyNhapPhanTram(event: any) {
    this.data.PercenDiscount = +event.target.value;
  }
  onKeyMax(event: any) {
    this.data.MaxCountUse = +event.target.value
  }
}
