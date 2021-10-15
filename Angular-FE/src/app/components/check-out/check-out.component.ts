import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookInDetailCartDto } from 'src/app/model/book-in-detail-cart-dto';
import { CartItem } from 'src/app/model/cart-item';
import { DistinctDTO } from 'src/app/model/distinct-dto';
import { ProvinceDTO } from 'src/app/model/province-dto';
import { SubmitFormCart } from 'src/app/model/submit-form-cart';
import { WardDTO } from 'src/app/model/ward-dto';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { CheckOutService } from 'src/app/service/check-out.service';
import { TrimWhiteSpaceService } from 'src/app/validator/trim-white-space.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cartItems: CartItem[] = [];
  formCustomerReceiverBook!: FormGroup;
  provinces: ProvinceDTO[] = [];
  distincts: DistinctDTO[] = [];
  wards: WardDTO[] = [];

  distinctBaseOnProvinceCode: DistinctDTO[] = [];
  wardBaseOnDistinctCode: WardDTO[] = [];

  checkSelectedProvince: boolean = false;
  checkSelectedDistinct: boolean = false;

  submitFormCart!: SubmitFormCart;

  carts: CartItem[] = [];

  constructor(
    private ckOutSer: CheckOutService,
    private formBuilder: FormBuilder,
    private router: Router,
    private addToCartSer: AddToCartService
  ) {}

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')!);
    if (this.cartItems == null) {
      alert('làm gì có sản phẩm mà thanh toán');
      this.router.navigateByUrl('/books');
    } else {
      this.formCustomerReceiverBook = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        sdt: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        distinct: new FormControl('', [Validators.required]),
        ward: new FormControl('', [Validators.required]),
        address: new FormControl('', [
          Validators.required,
          TrimWhiteSpaceService.notOnlyWhiteSpace,
        ]),
        note: new FormControl(''),
        couponCode: new FormControl('No'),
      });

      this.getProvince();
      this.getDistinct();
      this.getWard();
    }
  }
  get name() {
    return this.formCustomerReceiverBook.get('name');
  }
  get sdt() {
    return this.formCustomerReceiverBook.get('sdt');
  }
  get province() {
    return this.formCustomerReceiverBook.get('procvince');
  }
  getProvince() {
    this.ckOutSer.getProvince().subscribe((data) => {
      this.provinces = data;
    });
  }
  getDistinct() {
    this.ckOutSer.getDisinct().subscribe((data) => {
      this.distincts = data;
    });
  }
  getWard() {
    this.ckOutSer.getWard().subscribe((data) => {
      this.wards = data;
    });
  }
  getDistinctByProvinceCode() {
    const provinceCode = this.formCustomerReceiverBook.get('province')?.value;
    this.distinctBaseOnProvinceCode = [];
    this.wardBaseOnDistinctCode = [];
    for (let item of this.distincts) {
      if (item.province_code == provinceCode.code) {
        this.distinctBaseOnProvinceCode.push(item);
      }
    }
    this.checkSelectedProvince = true;
  }
  getWardsByDistinctCode() {
    const distinctCode = this.formCustomerReceiverBook.get('distinct')?.value;
    this.wardBaseOnDistinctCode = [];
    for (let item of this.wards) {
      if (distinctCode.code == item.district_code) {
        this.wardBaseOnDistinctCode.push(item);
      }
    }
    this.checkSelectedDistinct = true;
  }
  submitFromNhanHang() {
    if (this.formCustomerReceiverBook.invalid) {
      alert('Chưa Nhập Đủ Thông Tin');
    } else {
      this.submitFormCart = new SubmitFormCart();
      this.submitFormCart.couponCode =
        this.formCustomerReceiverBook.get('couponCode')?.value;

      this.submitFormCart.sdt = this.formCustomerReceiverBook.get('sdt')?.value;
      this.submitFormCart.nameReceiveProduct =
        this.formCustomerReceiverBook.get('name')?.value;
      this.submitFormCart.note =
        this.formCustomerReceiverBook.get('note')?.value;
      let province = this.formCustomerReceiverBook.get('province')?.value.name;
      let distinct = this.formCustomerReceiverBook.get('distinct')?.value.name;
      let ward = this.formCustomerReceiverBook.get('ward')?.value.name;
      let address =
        this.formCustomerReceiverBook.get('address')?.value +
        ' , ' +
        ward +
        ' , ' +
        distinct +
        ' , ' +
        province;
      this.submitFormCart.address = address;
      this.carts = this.addToCartSer.carts;
      let books: BookInDetailCartDto[] = [];
      let book: BookInDetailCartDto;
      for (let item of this.carts) {
        book = new BookInDetailCartDto();
        book.Id = item.book.id;
        book.Name = item.book.name;
        book.Quantity = item.quantityInCart;
        book.ShortReview = item.book.shortReview;
        books.push(book);
      }
      this.submitFormCart.bookInDetailCartDTOs = books;
      console.log(this.submitFormCart);
      this.ckOutSer.doCheckOut(this.submitFormCart).subscribe({
        next: (res) => {
          alert(` Thành cộng `);
          localStorage.removeItem('cartItems');
          this.addToCartSer.totalPrice.next(0);
          this.addToCartSer.totalQuantity.next(0);
          this.addToCartSer.totalBookByIdInCart.next(0);
          this.addToCartSer.removeAllItem();
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (err.status == 401) {
            localStorage.removeItem('tokenLogin');
            localStorage.removeItem('emailLogin');
            alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
            this.router.navigateByUrl('/login').then(() => {
              window.location.reload();
            });
          } else alert(err.message);
        },
      });
    }
  }
}
