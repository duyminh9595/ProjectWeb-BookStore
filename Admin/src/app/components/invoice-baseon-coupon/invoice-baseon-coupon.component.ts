import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartOnAdmin } from 'src/app/model/cart-on-admin';
import { InvoiceService } from '../invoice/service/invoice.service';
import { InvoiceBaseonCouponService } from './service/invoice-baseon-coupon.service';

@Component({
  selector: 'app-invoice-baseon-coupon',
  templateUrl: './invoice-baseon-coupon.component.html',
  styleUrls: ['./invoice-baseon-coupon.component.css']
})
export class InvoiceBaseonCouponComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private ser: InvoiceBaseonCouponService, private ser1: InvoiceService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.getBaseOnCouponId());
  }
  couponcode!: number;
  datas: CartOnAdmin[] = [];
  getBaseOnCouponId() {
    let checkexists = this.activeRoute.snapshot.paramMap.has('couponid');
    if (checkexists) {
      this.couponcode = +this.activeRoute.snapshot.paramMap.get('couponid')!;
      this.ser.getAllCartBaseOnCoupon(+this.couponcode).subscribe(this.getDatas());
    }
    else {
      this.router.navigateByUrl('/event')
    }
  }
  getDatas() {
    return (data: any) => {
      this.datas = [];
      this.datas = data;
    }
  }
  getDataFirst() {
    this.ser.getAllCartBaseOnCoupon(+this.couponcode).subscribe(this.getDatas());
  }
  xacnhandonhang(item: CartOnAdmin) {
    this.ser1.apporve(item.id).subscribe({
      next: res => {
        this.datas = [];
        this.getDataFirst();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  nhapmahoadon(event: any) {
    let data = event.target.value;
    if (data.length > 0) {
      this.ser.getAllCartBaseOnCouponAndCartId(this.couponcode, +data).subscribe(this.getDatas());
    }
    else {
      this.datas = []
      this.getDataFirst();
    }
  }
}
