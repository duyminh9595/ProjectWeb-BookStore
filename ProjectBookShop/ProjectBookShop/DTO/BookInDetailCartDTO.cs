using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class BookInDetailCartDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ShortReview { get; set; }
        public string UrlBookImageShow { get; set; }
    }
}
