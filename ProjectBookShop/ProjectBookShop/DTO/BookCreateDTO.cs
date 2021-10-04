using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class BookCreateDTO
    {
        public string Name { get; set; }
        public string ShortReview { get; set; }
        public int PublisherId { get; set; }
        public int TypeId { get; set; }
        public int Quantity { get; set; }
        public int MyProperty { get; set; }
        public int Price { get; set; }
    }
}
