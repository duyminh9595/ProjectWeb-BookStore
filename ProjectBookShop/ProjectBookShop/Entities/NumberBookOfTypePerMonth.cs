using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class NumberBookOfTypePerMonth
    {
        public int Id { get; set; }
        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }
        public int TypeId { get; set; }
        public Type Type { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
