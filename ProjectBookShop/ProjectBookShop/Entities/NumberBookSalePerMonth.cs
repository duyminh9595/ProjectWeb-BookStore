using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class NumberBookSalePerMonth
    {
        public int Id { get; set; }
        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
