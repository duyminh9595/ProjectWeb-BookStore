using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class ArticleShowDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CustomerId { get; set; }
        public string AuthorName { get; set; }
        public string UrlImageArtice { get; set; }
        public DateTime DateOfApproved { get; set; }
        public string Content { get; set; }
        public bool Approve { get; set; }
        public DateTime DateOfCreated { get; set; }

    }
}
