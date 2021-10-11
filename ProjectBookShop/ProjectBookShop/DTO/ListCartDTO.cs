using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class ListCartDTO
    {
        public int Id { get; set; }
        public string DateOfCreated { get; set; }
        public int TotalPrice { get; set; }
        public int TotalPriceAfterDiscount { get; set; }
        public bool Status { get; set; }
        public int CouponDiscountId { get; set; }
        public float PercentDiscount { get; set; }
    }
}
