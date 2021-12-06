using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CommendOnBookAllDTO
    {
        public string Commend { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool Status { get; set; }
        public float Rating { get; set; }
        public int UserInfoId { get; set; }

    }
}
