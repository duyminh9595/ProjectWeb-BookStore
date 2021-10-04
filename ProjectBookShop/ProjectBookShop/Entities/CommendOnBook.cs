using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class CommendOnBook
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int CustomerId { get; set; }
        public Book Book { get; set; }
        public UserInfo Customer { get; set; }
        public string DateOfCreated { get; set; }
        public bool Status { get; set; }
        public string DateOfDisabled { get; set; }
    }
}
