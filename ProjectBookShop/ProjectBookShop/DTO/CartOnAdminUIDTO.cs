using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CartOnAdminUIDTO
    {
        public int id { get; set; }
        public bool status { get; set; }
        public string date_created { get; set; }
        public bool admin_approve { get; set; }
        public int admin_approve_id { get; set; }
    }
}
