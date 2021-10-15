import { BookInDetailCartDto } from './book-in-detail-cart-dto';

export class SubmitFormCart {
  couponCode!: string;
  address!: string;
  sdt!: string;
  nameReceiveProduct!: string;
  note!: string;
  bookInDetailCartDTOs!: BookInDetailCartDto[];
}
