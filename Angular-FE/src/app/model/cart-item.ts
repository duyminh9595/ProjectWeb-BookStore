import { BookInHomepage } from './book-in-homepage';

export class CartItem {
  book!: BookInHomepage;
  quantityInCart!: number;
  id!: number;
  quantity!: number;
  name!: string;
  shortreview!: string;
  urlbookimageshow!: string;
  price!: number;
  priceTotal!: number;
}
