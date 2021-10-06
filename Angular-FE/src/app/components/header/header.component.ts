import { Component, OnInit } from '@angular/core';
import { CheckJwtService } from 'src/app/auth/check-jwt.service';
import { AddToCartService } from 'src/app/service/add-to-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  emailLogin!: string;
  totalBookByIdInCart!: number;
  public checkStatusLogin: boolean = false;
  constructor(
    checkJwtSer: CheckJwtService,
    private addToCartSer: AddToCartService
  ) {}

  ngOnInit(): void {
    this.addToCartSer.totalBookByIdInCart.subscribe((data) => {
      this.totalBookByIdInCart = data;
    });
    if (
      localStorage.getItem('tokenLogin') != null &&
      localStorage.getItem('emailLogin') != null
    ) {
      this.checkStatusLogin = true;
    }
  }
  logOut() {
    localStorage.removeItem('tokenLogin');
    localStorage.removeItem('emailLogin');
    this.checkStatusLogin = false;
  }
}
