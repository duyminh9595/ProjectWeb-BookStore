using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class NumberBookOfPublisherPerMonth
    {
        public int Id { get; set; }
        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }
        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
