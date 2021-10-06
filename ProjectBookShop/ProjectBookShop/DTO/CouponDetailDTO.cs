using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CouponDetailDTO
    {
        public CouponDetailDTO()
        {
            this.Status = true;
        }
        public int Id { get; set; }

        public string CouponCode { get; set; }
        public string DetailCoupon { get; set; }
        public DateTime DateOfCreated { get; set; }
        public DateTime DateOfEnded { get; set; }
        public int CountUse { get; set; }
        public int MaxCountUse { get; set; }
        public bool Status { get; set; }
        public float PercenDiscount { get; set; }
    }
}
