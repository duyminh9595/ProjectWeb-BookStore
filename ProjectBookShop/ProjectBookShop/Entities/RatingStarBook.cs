using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class RatingStarBook
    {
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int UserInfoId { get; set; }
        public UserInfo UserInfo { get; set; }
        public float Rating { get; set; }
        public string Commend { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool Status { get; set; }
    }
}
