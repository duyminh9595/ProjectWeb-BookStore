import { Component, OnInit } from '@angular/core';
import { CartOnAdmin } from 'src/app/model/cart-on-admin';
import { InvoiceService } from './service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private ser: InvoiceService) { }

  datas: CartOnAdmin[] = [];
  ngOnInit(): void {
    this.getDataFirst();
  }
  getDataFirst() {
    this.ser.getAllCart().subscribe(this.getDatas());
  }
  getDatas() {
    return (data: any) => {
      this.datas = data;
    }
  }
  xacnhandonhang(item: CartOnAdmin) {
    this.ser.apporve(item.id).subscribe({
      next: res => {
        this.datas = [];
        this.getDataFirst();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
}
