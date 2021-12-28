using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class DetailCart
    {
        [Required]
        public int CartId { get; set; }
        [Required]
        public int BookId { get; set; }
        public Cart Cart { get; set; }
        public Book Book { get; set; }
        [Required]
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}
