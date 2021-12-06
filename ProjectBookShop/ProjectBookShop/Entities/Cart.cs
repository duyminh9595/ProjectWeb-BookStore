using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class Cart
    {
        public Cart()
        {
            this.Status = true;
        }
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public UserInfo Customer { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool Status { get; set; }
        public DateTime DateOfDisabled { get; set; }
        public string Reason { get; set; }
        public int TotalPrice { get; set; }
        public int TotalPriceAfterDiscount { get; set; }
        public int CouponDiscountId { get; set; }
        public CouponDiscount CouponDiscount { get; set; }
        public List<DetailCart> DetailCarts { get; set; }
        public int AdminUserId { get; set; }
        public AdminUser AdminUser { get; set; }
        public bool AdminApprove { get; set; }
        public DateTime DateAdminApprove { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string NameReceiveProduct { get; set; }
        [Required]
        public string SDT { get; set; }
        public string Note { get; set; }

    }
}
