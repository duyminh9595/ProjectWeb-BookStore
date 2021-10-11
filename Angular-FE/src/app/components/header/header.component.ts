import { Component, OnInit } from '@angular/core';
import { CheckJwtService } from 'src/app/auth/check-jwt.service';
import { PublisherDto } from 'src/app/model/publisher-dto';
import { TypeDto } from 'src/app/model/type-dto';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { SerService } from './service/ser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  emailLogin!: string;
  totalBookByIdInCart!: number;
  typesArray: TypeDto[] = [];
  publishersArray: PublisherDto[] = [];
  public checkStatusLogin: boolean = false;
  constructor(
    checkJwtSer: CheckJwtService,
    private addToCartSer: AddToCartService,
    private ser: SerService
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

    this.ser.getAllCatergories().subscribe({
      next: (res) => {
        this.typesArray = res;
        console.log(this.typesArray);
      },
      error: (err) => {},
    });
    this.ser.getAllPublishers().subscribe({
      next: (res) => {
        this.publishersArray = res;
        console.log(this.publishersArray);
      },
      error: (err) => {},
    });
  }
  logOut() {
    localStorage.removeItem('tokenLogin');
    localStorage.removeItem('emailLogin');
    this.checkStatusLogin = false;
  }
}
