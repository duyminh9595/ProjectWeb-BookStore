using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    [Index(nameof(CouponCode), IsUnique = true)]
    public class CouponDiscount
    {
        public int Id { get; set; }
        [Required]
        public string CouponCode { get; set; }
        public string  DetailCoupon { get; set; }
        public DateTime DateOfCreated { get; set; }
        public DateTime DateOfEnded { get; set; }
        public int CountUse { get; set; }
        public int MaxCountUse { get; set; }
        public bool Status { get; set; }
        public float PercenDiscount { get; set; }

    }
}
