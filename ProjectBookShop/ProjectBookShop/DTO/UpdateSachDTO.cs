using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class UpdateSachDTO
    {
        public string name { get; set; }
        public int typeId { get; set; }
        public int publisherId { get; set; }
        public string shortReview { get; set; }
        public string authorName { get; set; }
        public int price { get; set; }
    }
}
