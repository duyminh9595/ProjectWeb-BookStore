import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InforCart } from 'src/app/model/infor-cart';
import { InvoiceService } from '../invoice/service/invoice.service';
import { InvoiceDetailService } from './service/invoice-detail.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute, private ser: InvoiceDetailService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.dataFirst());
  }
  id!: number;
  dataFirst() {
    let checkidexist = this.activeRoute.snapshot.paramMap.has('invoiceid');
    if (checkidexist) {
      this.id = +this.activeRoute.snapshot.paramMap.get('invoiceid')!;
      console.log(this.id)
      this.getDataFirst();
    }
    else {
      this.router.navigateByUrl('/invoice');
    }
  }
  data: InforCart = new InforCart();
  getDataFirst() {
    this.ser.getCartDetail(this.id).subscribe({
      next: res => {
        this.data = res;
      },
      error: err => {
        this.router.navigateByUrl('/invoice')
      }
    })
  }
  gotoBook(id: number) {
    this.router.navigateByUrl('/book/' + id)
  }
}
