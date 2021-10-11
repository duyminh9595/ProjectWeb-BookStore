using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class Article
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string UrlImageArtice { get; set; }
        [Required]
        public string Content { get; set; }
        public bool Approve { get; set; }
        [Required]
        public DateTime DateOfCreated { get; set; }
        [Required]
        public int CustomerId { get; set; }
        public UserInfo Customer { get; set; }
        public int AdminId { get; set; }
        public DateTime DateOfApproved { get; set; }
        public string Reason { get; set; }
    }
}
