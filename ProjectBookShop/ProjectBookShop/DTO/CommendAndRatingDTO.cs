using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CommendAndRatingDTO
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public int UserInfoId { get; set; }
        public string UserInfoEmail { get; set; }
        public float Rating { get; set; }
        public string Commend { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool Status { get; set; }
    }
}
