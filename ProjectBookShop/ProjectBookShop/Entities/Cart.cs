using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string DateOfCreated { get; set; }
        public bool Status { get; set; }
        public string DateOfDisabled { get; set; }
        public string Reason { get; set; }
    }
}
