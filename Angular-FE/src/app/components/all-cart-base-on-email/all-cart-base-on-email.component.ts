import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartBaseOnEmailDto } from 'src/app/model/cart-base-on-email-dto';
import { LoadCartBaseOnEmailService } from './service/load-cart-base-on-email.service';

@Component({
  selector: 'app-all-cart-base-on-email',
  templateUrl: './all-cart-base-on-email.component.html',
  styleUrls: ['./all-cart-base-on-email.component.css'],
})
export class AllCartBaseOnEmailComponent implements OnInit {
  totalNumberCarts: number = 0;
  data: CartBaseOnEmailDto[] = [];
  constructor(
    private loadCartBaseOnEmail: LoadCartBaseOnEmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartBaseOnEmail.getCartsBaseOnEmail().subscribe({
      next: (res) => {
        this.data = res;
        this.totalNumberCarts = this.data.length;
        console.log(this.data);
      },
      error: (err) => {
        if (err.status == 401) {
          localStorage.removeItem('tokenLogin');
          localStorage.removeItem('emailLogin');
          alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
          this.router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        } else alert(err.error);
      },
    });
  }
}
