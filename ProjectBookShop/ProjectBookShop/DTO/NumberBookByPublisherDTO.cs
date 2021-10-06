using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class NumberBookByPublisherDTO
    {
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
        public int NumberBook { get; set; }
    }
}
