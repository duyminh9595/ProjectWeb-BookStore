export class CartBaseOnEmailDto {
  id!: number;
  dateOfCreated!: string;
  totalPrice!: number;
  totalPriceAfterDiscount!: number;
  status!: boolean;
  percentDiscount!: number;
}
