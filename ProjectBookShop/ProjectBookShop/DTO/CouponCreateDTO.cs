using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CouponCreateDTO
    {
        public string CouponCode { get; set; }
        public string DetailCoupon { get; set; }
        public String DateOfCreated { get; set; }
        public String DateOfEnded { get; set; }
        public int CountUse { get; set; }
        public int MaxCountUse { get; set; }
        public bool Status { get; set; }
        public float PercenDiscount { get; set; }
    }
}
