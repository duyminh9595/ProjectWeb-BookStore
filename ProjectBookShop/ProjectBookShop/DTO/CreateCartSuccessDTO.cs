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
        public List<BookInCreateCartSuccessDTO> BookInDetailCartDTOs { get; set; }
    }
}
