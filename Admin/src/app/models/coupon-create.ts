export class CouponCreate {
    CouponCode!: string;
    DetailCoupon!: string;
    DateOfCreated!: string;
    DateOfEnded!: string;
    CountUse: number = 0;
    MaxCountUse!: number;
    Status: boolean = true;
    PercenDiscount!: number;
}
