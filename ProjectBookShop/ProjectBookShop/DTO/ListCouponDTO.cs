using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class ListCouponDTO
    {
        public int Id { get; set; }
        public string DetailCoupon { get; set; }
        public DateTime DateOfCreated { get; set; }
        public DateTime DateOfEnded { get; set; }
        public bool Status { get; set; }
    }
}
