using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CartContentBookDTO
    {
        public int cartid { get; set; }
        public int userid { get; set; }
        public string date_created { get; set; }
        public string email_customer { get; set; }
        public int total_price { get; set; }
        public int total_price_after_discount { get; set; }
    }
}
