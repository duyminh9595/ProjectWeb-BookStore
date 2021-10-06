using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class DetailCart
    {
        public int CartId { get; set; }
        public int BookId { get; set; }
        public Cart Cart { get; set; }
        public Book Book { get; set; }
        public int Quantity { get; set; }
    }
}
