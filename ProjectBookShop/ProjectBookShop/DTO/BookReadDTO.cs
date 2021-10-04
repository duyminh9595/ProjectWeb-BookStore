using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class BookReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int PublisherId { get; set; }
        public int TypeId { get; set; }
        public string PublisherName { get; set; }
        public string TypeName { get; set; }

    }
}
