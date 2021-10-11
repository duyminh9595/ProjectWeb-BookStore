import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoCartId } from 'src/app/model/info-cart-id';
import { LoadCartBaseOnIdService } from './service/load-cart-base-on-id.service';

@Component({
  selector: 'app-cart-base-on-id',
  templateUrl: './cart-base-on-id.component.html',
  styleUrls: ['./cart-base-on-id.component.css'],
})
export class CartBaseOnIdComponent implements OnInit {
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private loadData: LoadCartBaseOnIdService
  ) {}
  data: InfoCartId = new InfoCartId();
  ngOnInit(): void {
    let check = this.activedRoute.snapshot.paramMap.has('cartId');
    console.log(check);
    if (!this.activedRoute.snapshot.paramMap.has('cartId')) {
      this.router.navigateByUrl('/cartsbaseonemail');
    } else {
      let cartId = +this.activedRoute.snapshot.paramMap.get('cartId')!;
      this.loadData.getCartDetail(cartId).subscribe({
        next: (res) => {
          this.data = res;
          console.log(this.data);
        },
        error: (err) => {},
      });
    }
  }
}
