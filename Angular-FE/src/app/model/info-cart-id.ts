import { BookInCartid } from './book-in-cartid';

export class InfoCartId {
  cartId!: number;
  totalPrice!: number;
  totalPriceAfterDisCount!: number;
  couponCode!: string;
  percentDiscount!: number;
  address!: string;
  nameReceiveProduct!: string;
  sdt!: string;
  note!: string;
  bookInDetailCartDTOs: BookInCartid[] = [];
}
