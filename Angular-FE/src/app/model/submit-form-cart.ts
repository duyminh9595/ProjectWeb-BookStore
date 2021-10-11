import { BookInDetailCartDto } from './book-in-detail-cart-dto';

export class SubmitFormCart {
  CouponCode!: string;
  Address!: string;
  SDT!: string;
  NameReceiveProduct!: string;
  Note!: string;
  BookInDetailCartDTOs!: BookInDetailCartDto[];
}
