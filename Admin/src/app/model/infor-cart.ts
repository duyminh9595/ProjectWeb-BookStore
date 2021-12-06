import { BookInCart } from "./book-in-cart";

export class InforCart {
    cartId!: number;
    totalPrice!: number;
    totalPriceAfterDisCount!: number;
    couponCode!: string;
    percentDiscount!: number;
    address!: string;
    nameReceiveProduct!: string;
    sdt!: string;
    date_created!: string;
    userid!: number;
    note!: string;
    bookInDetailCartDTOs!: BookInCart[];
}
