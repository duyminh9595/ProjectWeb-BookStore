import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoCart } from 'src/app/models/info-cart';
import { BillingAccountService } from './service/billing-account.service';

@Component({
  selector: 'app-billing-account',
  templateUrl: './billing-account.component.html',
  styleUrls: ['./billing-account.component.css']
})
export class BillingAccountComponent implements OnInit {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute, private ser: BillingAccountService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.loadUserCart());
  }
  data: InfoCart[] = [];
  loadUserCart() {
    let checkexist = this.activeRoute.snapshot.paramMap.has('accountid');
    if (checkexist) {
      let id = +this.activeRoute.snapshot.paramMap.get('accountid')!;
      this.ser.getAllCartUserById(id).subscribe({
        next: res => {
          this.data = res;
          console.log(this.data)
        }
      })
    }
    else {
      this.router.navigateByUrl('customer');
    }
  }
  viewInvoice(id: number) {
    this.router.navigateByUrl('/invoice/' + id)
  }
}
