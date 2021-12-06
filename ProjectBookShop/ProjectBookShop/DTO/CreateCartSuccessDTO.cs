using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CreateCartSuccessDTO
    {
        public int CartId { get; set; }
        public int TotalPrice { get; set; }
        public int TotalPriceAfterDisCount { get; set; }
        public string CouponCode { get; set; }
        public float PercentDiscount { get; set; }
        public string Address { get; set; }
        public string NameReceiveProduct { get; set; }
        public string SDT { get; set; }
        public string Note { get; set; }
        public String date_created { get; set; }
        public int userid { get; set; }
        public List<BookInCreateCartSuccessDTO> BookInDetailCartDTOs { get; set; }
    }
}
